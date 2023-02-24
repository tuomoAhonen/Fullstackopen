const Notification = ({message}) => {
  if (message === null) {
    return null;
  };

  let styledMessage;
  const messageStyle = {
    backgroundColor: '#ffffff',
    padding: 5,
    position: 'sticky',
    //top: 10,
    bottom: 10,
    left: 10,
    right: 10,
    marginLeft: 'auto',
    marginRight: 'auto'
  };

  switch (message.msgtype) {
    case 'error':
      messageStyle.color = '#B22222';
      messageStyle.border = 'thick double #B22222';
      styledMessage = <div id="error" style={messageStyle}>{message.msg}</div>;
      break;
    case 'success':
      messageStyle.color = '#7CFC00';
      messageStyle.border = 'thick double #7CFC00';
      styledMessage = <div id="success" style={messageStyle}>{message.msg}</div>;
      break;
    default:
      messageStyle.color = '#000000';
      messageStyle.border = 'thick double #000000';
      styledMessage = <div id="nostyle" style={messageStyle}>{message.msg}</div>;
      break;
  };

  return styledMessage;
};

export default Notification;