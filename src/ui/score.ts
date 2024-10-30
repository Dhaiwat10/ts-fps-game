export class Score {
  private element: HTMLDivElement;
  private score: number = 0;

  constructor() {
    this.element = document.createElement('div');
    this.setupStyles();
    document.body.appendChild(this.element);
    this.updateDisplay();
  }

  private setupStyles() {
    Object.assign(this.element.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      color: 'white',
      fontSize: '24px',
      fontFamily: 'Arial, sans-serif',
      userSelect: 'none', // Prevent text selection
      textShadow: '2px 2px 2px rgba(0,0,0,0.5)', // Make it readable on any background
    });
  }

  increment(points: number = 1) {
    this.score += points;
    this.updateDisplay();
  }

  private updateDisplay() {
    this.element.textContent = `Score: ${this.score}`;
  }

  getScore() {
    return this.score;
  }
}
