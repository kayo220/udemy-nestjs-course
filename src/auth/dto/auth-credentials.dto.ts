import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MinLength, maxLength, MaxLength, Matches } from "class-validator";
import { RegExHelper } from "../../helpers/regex-helper";
import { MessageHelper } from "../../helpers/message-helper";

export class AuthCredentialsDto {
    @ApiProperty()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    @Matches(RegExHelper.password, { message: MessageHelper.password_wrong_pattern_message })
    password: string;
}