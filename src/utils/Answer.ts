export class Answer {
  constructor(private readonly _value: number) {}

  value = () => this._value;
}
