/**
 * Class for message business entity
 */

export class Message {
  constructor(
    private readonly _parentId: number,
    private _userId: number,
    private _text: string,
    private _createdAt?: string,
    private _file?: string
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

  get file(): string | undefined {
    return this._file;
  }

  get createdAt(): string | undefined {
    return this._createdAt;
  }
}
