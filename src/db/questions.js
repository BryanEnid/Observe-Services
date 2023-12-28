const { QuestionModel } = require('../models');

/**
 * @param {{
 *   creatorId?: string,
 *   bucketId?: string,
 *   bucketVideoId?: string,
 *   userProfileId?: string
 * }} query question search queries
 * @return {Promise<BucketModel[]>}
 */
const getQuestionsList = (query) => QuestionModel.find(query);

/**
 * @param {FilterQuery<QuestionModel>} filterQuery filter options
 * @param {ProjectionType<QuestionModel>?} projection
 * @return {Promise<QuestionModel>}
 */
const findQuestion = (filterQuery, projection) => QuestionModel.findOne(filterQuery, projection);

/**
 * @param {QuestionModel} data Question data
 * @return {Promise<QuestionModel>}
 */
const createQuestion = (data) => {
  const question = new QuestionModel(data);
  return question.save();
};

/**
 * @param {string} id Question ID
 * @param {QuestionModel} data Question data
 * @return {Promise<QuestionModel>}
 */
const updateQuestion = (id, data) => QuestionModel.findByIdAndUpdate(id, data, { new: true });

/**
 * @param {string} _id Question ID
 * @return {Promise<QuestionModel>}
 */
const deleteQuestion = (_id) => QuestionModel.deleteOne({ _id });

/**
 * @param {string} questionId Question ID
 * @param {{ coords: { x: Number, y: Number }, text: String }} data
 * @return {Promise<QuestionModel>}
 */
const createAnswer = (questionId, data) => updateQuestion(questionId, {
  $set: { answer: data },
});

/**
 * @param {string} questionId Question ID
 * @param {{ coords?: { x: Number, y: Number }, text?: String }} data
 * @return {Promise<QuestionModel>}
 */
const updateAnswer = (questionId, data) => updateQuestion(questionId, {
  $set: { answer: data },
});

/**
 * @param {string} questionId Question ID
 * @return {Promise<QuestionModel>}
 */
const deleteAnswer = (questionId) => updateQuestion(questionId, {
  $set: { answer: null },
});

module.exports = {
  getQuestionsList,
  findQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  createAnswer,
  updateAnswer,
  deleteAnswer,
};
