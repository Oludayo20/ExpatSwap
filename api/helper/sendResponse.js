class SendResponse {
  capitalizeWord(word) {
    const capWrd = word.split('')[0].toUpperCase() + word.slice(1);
    return capWrd;
  }

  error(res, code, message, statusCode, data) {
    const response = {
      errorStatus: true,
      code: code ?? '--error',
      message: message ?? this.capitalizeWord('error-message'),
      data: data ?? null
    };
    return res.status(statusCode).json(response);
  }

  success(res, code, message, statusCode, data) {
    const response = {
      errorStatus: false,
      code: code ?? '--success',
      message: message ?? this.capitalizeWord('success-message'),
      data: data ?? []
    };
    return res.status(statusCode).json(response);
  }
}

export default SendResponse;
