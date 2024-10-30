export class Crosshair {
  private element: HTMLDivElement;

  constructor() {
      this.element = document.createElement('div');
      this.element.id = 'crosshair';
      this.setupStyles();
      document.body.appendChild(this.element);
  }

  private setupStyles() {
      Object.assign(this.element.style, {
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '10px',
          height: '10px',
          backgroundColor: 'white',
          borderRadius: '50%',
          pointerEvents: 'none', // So it doesn't interfere with clicking
          zIndex: '1000'
      });
  }
}