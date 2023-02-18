import { values, regex } from '../constants/values';

const LottoValidatorConditions = {
  isPositiveInteger(number) {
    return regex.POSITIVE_INTEGER.test(number);
  },

  isDividedByPrice(number) {
    return !(number % values.LOTTO_PRICE);
  },

  isInRange(number) {
    return number >= values.LOWER_BOUND && number <= values.UPPER_BOUND;
  },

  hasNoBlank(splitedWinningNumber) {
    return !splitedWinningNumber.includes(' ');
  },

  isYorN(restartOrNot) {
    return restartOrNot === values.YES || restartOrNot === values.NO;
  },

  isNotOverlap(winningNumber) {
    return new Set(winningNumber).size === winningNumber.length;
  },

  isSixLength(winningNumber) {
    return winningNumber.length === values.LOTTO_LENGTH;
  },

  isBonusNumInWinningNum(winningNumber, number) {
    return !winningNumber.includes(+number);
  },
};

export default LottoValidatorConditions;