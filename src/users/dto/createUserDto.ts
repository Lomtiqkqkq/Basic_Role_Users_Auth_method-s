export class CreateUserDto {
  readonly username: string;
  readonly discordId: string;
  readonly avatar?:string;
  readonly refreshToken?: string;
}