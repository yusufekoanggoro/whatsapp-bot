const validate = require('validate.js');
const wrapper = require('../../../../helpers/utils/wrapper');
const { BadRequestError } = require('../../../../helpers/error');

const isValidPayload = (payload, constraint) => {
  const { value, error } = constraint.validate(payload);
  if (!validate.isEmpty(error)) {
    return wrapper.error(new BadRequestError(error.details[0].message));
  }
  return wrapper.data(value, 'success', 200);
};

module.exports = {
  isValidPayload
};
