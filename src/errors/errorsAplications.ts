class AppErrosCustom extends Error{
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message); // chama o Error nativo
    this.statusCode = statusCode;

    // Corrige o prototype (importante no TS)
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export { AppErrosCustom };