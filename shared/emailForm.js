
var emailForm = createCustomNonTextTag('form','container');
emailForm.setAttribute('action', 'mailto:esdrasobregon@hotmail.com');
emailForm.setAttribute('method', 'get');
emailForm.setAttribute('enctype', 'text/plain');
var headder = createCustomTextTag('h3', 'text-info d-flex justify-content-center', 'Send us an email for info');
var emailNamediv = createCustomNonTextTag('div','form-group');
var emailNameInp = createCustomNonTextTag('input','form-control');
emailNameInp.setAttribute('id','emailName');
emailNameInp.setAttribute('placeholder','Your name please');
emailNameInp.setAttribute('name', 'emailName');
emailNamediv.appendChild(emailNameInp);

var emailDiv = createCustomNonTextTag('div','form-group');
var emailInp = createCustomNonTextTag('input','form-control');
emailInp.setAttribute('id','emailName');
emailInp.setAttribute('placeholder','Your email please');
emailInp.setAttribute('name', 'email');
emailDiv.appendChild(emailInp);

var emailCommentsDiv = createCustomNonTextTag('div','form-group');
var textareaComments = createCustomNonTextTag('textarea','form-control');
textareaComments.setAttribute('id','emailName');
textareaComments.setAttribute('placeholder','Your email please');
textareaComments.setAttribute('name', 'comments');
textareaComments.setAttribute('rows', '12');
textareaComments.setAttribute('cols', '35');
emailCommentsDiv.appendChild(textareaComments);

var btnActionsDiv = createCustomNonTextTag('div','form-group');
var btnSendInp = createCustomNonTextTag('input','btn btn-outline-success my-2 my-sm-0');
btnSendInp.setAttribute('value','Send');
btnSendInp.setAttribute('type','submit');
btnSendInp.setAttribute('name', 'submit');

var btnClearInp = createCustomNonTextTag('input','btn btn-warning');
btnClearInp.setAttribute('value','Clear Form');
btnClearInp.setAttribute('type','reset');
btnClearInp.setAttribute('name', 'reset');
btnClearInp.setAttribute('onclick', 'hideShow()');
btnClearInp.appendChild(btnSendInp);
appendChildListTag([btnSendInp, btnClearInp], btnActionsDiv);


appendChildListTag([emailNamediv, emailDiv, emailCommentsDiv, btnActionsDiv], emailForm);
$('#emailContent').append(headder);
$('#emailContent').append(emailForm);
