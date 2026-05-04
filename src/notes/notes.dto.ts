export class NoteDto {
  constructor(
    public id: string,
    public user_id: string,
    public title: string,
    public content: string,
    public created_at: Date,
    public updated_at: Date,
  ) {}
}
