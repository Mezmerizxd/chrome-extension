class StateManager {
  protected static instance: StateManager;

  static getInstance(): StateManager {
    if (!StateManager.instance) {
      StateManager.instance = new StateManager();
    }
    return StateManager.instance;
  }

  protected state: State = {
    backgroundReady: false,
    popupReady: false,
  };

  private constructor() {}

  public getState(): State {
    return this.state;
  }

  public setState(state: State): void {
    this.state = state;
  }
}

const stateManager = StateManager.getInstance();
export default stateManager;
