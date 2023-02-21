import generateRandomNumber from '../utils/generateRandomNumber';
import Lotto from './Lotto';
import WinningLotto from './WinningLotto';
import { VALUES, PRIZE } from '../constants/values';

class LottoMachine {
  #lottos = [];
  #winnnigLotto;

  constructor(money) {
    this.buyLotto(money);
  }

  get lottos() {
    return this.#lottos;
  }

  buyLotto(money) {
    for (let i = 0; i < Math.floor(money / VALUES.LOTTO_PRICE); i++) {
      this.#lottos.push(new Lotto(this.generateLottoNumber()));
    }
  }

  generateLottoNumber() {
    const { LOWER_BOUND, UPPER_BOUND } = VALUES;
    const randomLottoNumbers = [];

    while (randomLottoNumbers.length !== VALUES.LOTTO_LENGTH) {
      const randomNumber = generateRandomNumber(LOWER_BOUND, UPPER_BOUND);
      if (!randomLottoNumbers.includes(randomNumber)) randomLottoNumbers.push(randomNumber);
    }

    return randomLottoNumbers.sort((prev, next) => prev - next);
  }

  initWinningLotto(winningNumber, bonusNumber) {
    this.#winnnigLotto = new WinningLotto(winningNumber, bonusNumber);
  }

  calculateRanks() {
    return this.#lottos.map(lotto => this.#winnnigLotto.checkLotteryWinningsRank(lotto.lottoNum));
  }

  calculateTotalSum(ranks) {
    return ranks.reduce((acc, curr) => acc + PRIZE[curr - 1], 0);
  }

  calculateRateOfProfit(lotteryWinningsSum, lottosLength) {
    const { LOTTO_PRICE } = VALUES;
    const spentMoney = lottosLength * LOTTO_PRICE;

    return ((lotteryWinningsSum / spentMoney) * 100).toFixed(1);
  }

  calculateStatistics() {
    const statistics = {
      countOfRanks: new Array(6).fill(0),
      rateOfProfit: null,
    };
    const totalRanks = this.calculateRanks();

    totalRanks.forEach(rank => {
      statistics.countOfRanks[rank - 1] += 1;
    });

    statistics.rateOfProfit = this.calculateRateOfProfit(this.calculateTotalSum(totalRanks), totalRanks.length);

    return statistics;
  }
}

export default LottoMachine;