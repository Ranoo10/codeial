//Implmentation using classes
//this class would be initialized for every post on the page
//1. When page loads
//2. Creation of every post dynamically via ajax
console.log('hello1');
class PostComments {
    constructor(postId) {
        this.postId = postId;
        console.log('hello2');
        this.createComment();
    }

    createComment() {
        console.log('Form submitted');
        let newCommentForm = $(`#post-${this.postId}-comments-form`);

        newCommentForm.off('submit');

        newCommentForm.submit((e) => {
            console.log('hello4');
            e.preventDefault();
            let self = this;

            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: newCommentForm.serialize(),
                success: (data) => {
                    console.log('hello5');
                    let newComment = this.newCommentDom(data.data.comment, this.postId);
                    $(`#post-comments-${this.postId}`).prepend(newComment);
                    this.deleteComment($(' .delete-comment-button', newComment));
                    new Noty({
                        theme: 'relax',
                        text: "Comment Published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();
                },
                error: (error) => {
                    console.log(error.responseText);
                }
            });
        });
    
    }
 newCommentDom(comment, postId) {
    return $(`<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <li id="comment-${comment._id}">
            <p>
                <small>
                    <a class="delete-comment-button" href="/comments/destroy/${comment._id }"><i class="fa-solid fa-square-xmark"></i></a>
                </small>
                ${comment.content}
                <br>
                <small>
                    ${comment.user.name}
                </small>
            </p>
        </li> `);
}

 deleteComment(deleteLink) {
    $(deleteLink).click(function (e) {
        e.preventDefault();

        $.ajax({
            type: 'get',
            url: $(deleteLink).prop('href'),
            success: function (data) {
                $(`#commment-${data.data.comment_id}`).remove();

                new Noty({
                    theme: 'relax',
                    text: "Comment Deleted",
                    type: 'success',
                    layout: 'topRight',
                    timeout: 1500
                }).show();
            }, error: function (error) {
                console.log(error.responseText);
            }
        });
    });
}
}

const postId = postId;
const postComments = new PostComments(postId);


