export class UserDto {
  constructor(
    public id: string,
    public email: string,
    public created_at: string,
    public updated_at: string,
  ) {}
}
