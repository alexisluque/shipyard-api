export class UserDto {
  constructor(
    public id: string,
    public email: string,
    public created_at: Date,
    public updated_at: Date,
  ) {}
}
