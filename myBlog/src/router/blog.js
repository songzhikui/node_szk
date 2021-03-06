const { getList, getDetail, newBlog, updateBlog, deleteBlog }  = require('../controller/blog');
const { SuccessModel, ErrorModel }  = require('../model/resModel');

const blogRouterHandle = (req, res) => {
    const method = req.method;
    const id = req.query.id;

    // 获取博客列表
    if(method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';
        // const listData = getList(author, keyword);
        // return new SuccessModel(listData);
        const result = getList(author, keyword);
        return result.then(listData => {
            return new SuccessModel(listData);
        })

    }

    // 获取博客详情
    if(method === 'GET' && req.path === '/api/blog/detail') {
        const detailData = getDetail(id);
        return new SuccessModel(detailData);
    }

    // 新建一篇博客
    if(method === 'POST' && req.path === '/api/blog/new') {
        const newBlogData = newBlog(req.body);
        return new SuccessModel(newBlogData);
    }

    // 更新一篇博客
    if(method === 'POST' && req.path === '/api/blog/update') {
        const result = updateBlog(id,req.body);
        if(result){
            return new SuccessModel('博客更新成功');
        }else{
            return new ErrorModel('博客更新失败');
        }
    }

    // 删除一篇博客
    if(method === 'POST' && req.path === '/api/blog/delete') {
        const result = deleteBlog(id);
        if(result){
            return new SuccessModel('博客删除成功');
        }else{
            return new ErrorModel('博客删除失败');
        }
    }

}
module.exports = blogRouterHandle;