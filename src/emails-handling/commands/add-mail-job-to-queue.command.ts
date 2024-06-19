export class AddMailJobToQueueCommand {
  constructor(
    public readonly _id: string,
    public readonly email: string,
    public readonly firstName?: string,
    public readonly lastName?: string,
  ) {}
}