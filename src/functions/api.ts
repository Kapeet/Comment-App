import { newCommentData } from "../propTypes";

const amountOfCommentsToShow: number = 20;

//GET request to get comments from API
const getAPIdata = (APIcomments: Array<Object>, userScrolls: number): Promise<Object> => {
    return fetch(`https://jsonplaceholder.typicode.com/comments?_start=${userScrolls}&_end=${userScrolls + amountOfCommentsToShow}`)
        .then(response => response.json())
        .then((data: Array<Object>) => {
            console.log(APIcomments)
            if (APIcomments && APIcomments.length) {
                let combinedComments: Array<Object> = APIcomments.concat(data);
                return combinedComments;
                // console.log(npcombinedComments);
                // console.log(APIcomments);
                // setAPIcomments(combinedComments);
            }
            else {
                // setAPIcomments(data);
                return data;
            }
        })
        .catch(err => {
            return APIcomments;
        });
};

//POST request to add comment
const postCommentToAPI = (commentData: newCommentData): Promise<boolean> => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentData)
    };
    return fetch('https://test.steps.me/test/testAssignComment', requestOptions)
        .then(res => res.json())
        .then(() => {
            return true;
        })
        .catch(err => {
            return false;
        });
}

export { amountOfCommentsToShow, getAPIdata, postCommentToAPI };