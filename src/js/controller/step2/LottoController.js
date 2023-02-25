import LottoValidator from '../../model/LottoValidator';
import PurchaseMoneyInputView from '../../view/step2/PurchaseMoneyInputView';
import { convertToNum, convertValueToString } from '../../utils/common';
import LottoMachine from '../../model/LottoMachine';
import PurchaseLottoView from '../../view/step2/PurchaseLottoView';
import WinningLottoInputView from '../../view/step2/WinningLottoInputView';
import ResultModalView from '../../view/step2/ResultModalView';

class LottoController {
  #lottoMachine;

  constructor() {
    this.view = {
      purchaseMoneyInputView: new PurchaseMoneyInputView(),
      purchaseLottoView: new PurchaseLottoView(),
      winningLottoInputView: new WinningLottoInputView(),
      resultModalView: new ResultModalView(),
    };
    this.start();
  }

  start() {
    this.view.purchaseMoneyInputView.form.addEventListener('submit', e => {
      e.preventDefault();
      this.view.purchaseMoneyInputView.disableButton();

      const money = this.view.purchaseMoneyInputView.input.value;

      try {
        LottoValidator.validateMoneyInput(convertToNum(money));
        this.#lottoMachine = new LottoMachine(money);
        this.view.purchaseMoneyInputView.resetValue();
        this.showPurchaseLotto(this.#lottoMachine.lottos);
      } catch (error) {
        this.view.purchaseMoneyInputView.resetValue();
        alert(error);
      }
    });
  }

  showPurchaseLotto(lottos) {
    this.view.purchaseLottoView.rendering(lottos);
    this.view.winningLottoInputView.rendering();
    this.handleWinningInput();
  }

  handleWinningInput() {
    this.view.winningLottoInputView.form.addEventListener('submit', e => {
      e.preventDefault();

      const winningNumberInput = [...this.view.winningLottoInputView.winningNumberInput];
      const bonusNumberInput = convertToNum(this.view.winningLottoInputView.bonusNumberInput.value);

      try {
        LottoValidator.validateWinningNumberInput(convertValueToString(winningNumberInput));
        LottoValidator.validateBonusNumberInput(convertValueToString(winningNumberInput), bonusNumberInput);
        this.#lottoMachine.initWinningLotto(convertValueToString(winningNumberInput), bonusNumberInput);
        this.view.winningLottoInputView.resetValue(winningNumberInput);
        this.showLottoResult();
      } catch (error) {
        this.view.winningLottoInputView.resetValue(winningNumberInput);
        alert(error);
      }
    });
  }

  showLottoResult() {
    this.view.resultModalView.rendering(this.#lottoMachine.calculateStatistics());
    this.handleExitOrRestart();
  }

  handleExitOrRestart() {
    this.view.resultModalView.exitButton.addEventListener('click', e => {
      e.preventDefault();
      this.view.resultModalView.reset();
    });

    this.view.resultModalView.restartButton.addEventListener('click', e => {
      e.preventDefault();
      this.reset();
    });
  }

  reset() {
    this.view.purchaseLottoView.reset();
    this.view.winningLottoInputView.reset();
    this.view.resultModalView.reset();
  }
}

export default LottoController;
