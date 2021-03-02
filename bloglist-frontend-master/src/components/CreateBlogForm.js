import React from 'react'

const CreateBlogForm = ({title, title_handler, author, author_handler, url, url_handler, create_blog_handler}) => {
    return <form onSubmit={create_blog_handler}>
                <div>
                    title: <input type="text" value={title} name='title' onChange={title_handler} />
                </div>
                <div>
                    author: <input type="text" value={author} name='author' onChange={author_handler} />
                </div>
                <div>
                    url: <input type="text" value={url} name='url' onChange={url_handler} />
                </div>
                <div>
                    <button type="submit" value='submit'>Create</button>
                </div>
            </form>
}

export default CreateBlogForm