const { Joi } = require('celebrate');
const { getQuestionsList } = require('../../db/questions');
const { getBucketsList } = require('../../db/buckets');

const getQuestionsListValidation = {
  query: Joi.object({
    forUser: Joi.string().optional(),
    userProfileId: Joi.string().optional(),
    bucketId: Joi.string().optional(),
    bucketVideoId: Joi.string().optional(),
  }).optional(),
};

/**
 * @param req: Request
 * @param res: Response
 * @return {Promise<void>}
 */
const getQuestionsListRoute = async (req, res) => {
  const { query } = req;

  let options;
  if (query.forUser) {
    options = {
      $or: [
        { userProfileId: query.forUser },
      ],
    };

    const buckets = await getBucketsList({ creatorId: query.forUser });
    const bucketsIds = (buckets || []).map(({ _id }) => _id);
    if (bucketsIds?.length) {
      options.$or.push({ bucketId: { $in: bucketsIds } });
    }

    const bucketsVideoIds = (buckets || [])
      .map(({ videos }) => videos.map(({ _id }) => _id))
      .flat();
    if (bucketsVideoIds?.length) {
      options.$or.push({ bucketVideoId: { $in: bucketsVideoIds } });
    }
  } else
    if (query) {
      options = { ...query };
    }

  const questions = await getQuestionsList(options).sort({ createdAt: -1 });
  return res.send(questions);
};

module.exports = { getQuestionsListRoute, getQuestionsListValidation };
