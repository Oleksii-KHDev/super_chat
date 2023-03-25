/**
 * Class for message business entity
 */

export class Message {
  constructor(
    private readonly _parentId: number,
    private _userId: number,
    private _text: string,
    private _padding?: number,
    private _createdAt?: Date,
    private _file?: string | null
  ) {}

  get parentId(): number {
    return this._parentId;
  }

  get userId(): number {
    return this._userId;
  }

  get text(): string {
    return this._text;
  }

  get file(): string | undefined | null {
    return this._file;
  }

  get createdAt(): Date | undefined {
    return this._createdAt;
  }

  get padding(): number | undefined {
    return this._padding;
  }
}
