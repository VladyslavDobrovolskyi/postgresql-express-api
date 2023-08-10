function paginateResults(req, res, next) {
  const { count, offset, page } = req.query

  req.pagination = {
    count: count ? parseInt(count) : 5,
    offset: offset ? parseInt(offset) : null,
    page: page ? parseInt(page) : 1,
  }

  next()
}

module.exports = paginateResults
