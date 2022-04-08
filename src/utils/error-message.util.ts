import { GeneralFunctionsUtil } from './general-functions.util';

export class ErrorMessageUtil {
  public static parseErrorMessage(message: string): string {
    if (!message) {
      return '';
    }

    let parsedMessage = GeneralFunctionsUtil.capitalizeFirstLetter(message.replace(/"/g, '').replace(/\\/g, ''));

    if (!(parsedMessage.slice(-1) === '.')) {
      parsedMessage += '.';
    }

    return parsedMessage;
  }
}
