import { matchCountsToRank } from '../constants/values';

class WinningLotto {
  #winningNumber;
  #bonusNumber;

  constructor(winningNumber, bonusNumber) {
    this.#winningNumber = winningNumber.split(',').map(Number);
    this.#bonusNumber = bonusNumber;
  }

  computeMatchCounts(winningNumber, lottoNumber) {
    const matchCounts = lottoNumber.reduce((acc, cur) => {
      if (winningNumber.includes(cur)) return ++acc;
      return acc;
    }, 0);

    return matchCounts;
  }

  isFiveMatchCount(matchCounts) {
    return matchCounts === 5;
  }

  isSecondRank(bonusNumber, lottoNumber) {
    return lottoNumber.includes(bonusNumber);
  }

  checkLotteryWinningsRank(lottoNumber) {
    const matchCounts = this.computeMatchCounts(this.#winningNumber, lottoNumber);

    if (this.isFiveMatchCount(matchCounts)) {
      return matchCountsToRank[5][`${this.isSecondRank(this.#bonusNumber, lottoNumber) ? 0 : 1}`].rank;
    }
    return matchCountsToRank[matchCounts].rank;
  }
}

export default WinningLotto;