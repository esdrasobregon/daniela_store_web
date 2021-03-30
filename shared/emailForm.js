
var emailForm = createCustomNonTextTag('form', 'container');
emailForm.setAttribute('action', "mailto:" + webSiteEmail);
emailForm.setAttribute('method', 'post');
emailForm.setAttribute('enctype', 'text/plain');
emailForm.setAttribute("id", "emailForm");
isMobile() ? emailForm.hidden = true : emailForm.hidden = false;
var emailNamediv = createCustomNonTextTag('div', 'form-group');

var emailDiv = createCustomNonTextTag('div', 'form-group');
var emailInp = createCustomNonTextTag('input', 'form-control');
emailInp.setAttribute('type', 'text');
emailInp.setAttribute('id', 'emailId');
emailInp.setAttribute('placeholder', enterNameForEmal);
emailInp.setAttribute('name', 'emailId');
emailDiv.appendChild(emailInp);

var emailCommentsDiv = createCustomNonTextTag('div', 'form-group');
var textareaComments = createCustomNonTextTag('textarea', 'form-control');
textareaComments.setAttribute('type', 'text');
textareaComments.setAttribute('id', 'emailComment');
textareaComments.setAttribute('placeholder', enterCommentForEmal);
textareaComments.setAttribute('name', 'emailComment');
textareaComments.setAttribute('rows', '6');
textareaComments.setAttribute('cols', '20');
emailCommentsDiv.appendChild(textareaComments);

var btnActionsDiv = createCustomNonTextTag('div', 'form-group');
var btnSendInp = createCustomNonTextTag('input', 'btn btn-primary');
btnSendInp.setAttribute('value', btnSendForEmailText);
btnSendInp.setAttribute('type', 'submit');
btnSendInp.setAttribute('name', 'submit');

appendChildListTag([btnSendInp], btnActionsDiv);


appendChildListTag([emailNamediv, emailDiv, emailCommentsDiv, btnActionsDiv], emailForm);
$('#emailContent').append(emailForm);
