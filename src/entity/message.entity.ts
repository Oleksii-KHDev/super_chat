/**
 * @classdesc Class for message business entity
 */

export class Message {
  constructor(
    private readonly _parentId: number,
    private _userId: number,
    private _text: string,

    /**
     * @property {number?} _padding Space of left padding in chat window
     */
    private _padding?: number,

    private _createdAt?: Date,

    /**
     * @property {string|null|undefined} _file file attached to message
     */
    private _file?: string | null
  ) {}

  /**
   * Getters and setters for class private property
   */

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
