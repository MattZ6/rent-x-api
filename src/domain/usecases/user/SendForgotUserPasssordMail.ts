interface ISendForgotUserPasswordMailUseCase {
  execute(
    data: ISendForgotUserPasswordMailUseCase.Input
  ): Promise<ISendForgotUserPasswordMailUseCase.Output>;
}

namespace ISendForgotUserPasswordMailUseCase {
  type TeamEmail = {
    name: string;
    address: string;
  };

  export type HtmlTemplateVariables = {
    user_first_name: string;
    password_reset_link: string;
  };

  export type EmailData = {
    subject: string;
    text_content: string;
    html_template_path: string;
    from_email: TeamEmail;
  };

  export type PasswordResetLinkData = {
    base_url: string;
    query_param_name: string;
  };

  export type Input = {
    email: string;
  };

  export type Output = void;
}

export { ISendForgotUserPasswordMailUseCase };
