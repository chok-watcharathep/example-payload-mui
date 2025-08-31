export const mockErrorResponseData = { message: 'Invalid Request' }

export const mockedAxiosError = {
  isAxiosError: true,
  response: { data: mockErrorResponseData },
}

export const getPaginatedDocsMock = <T>(docs: T[]) => {
  return {
    docs,
    hasNextPage: false,
    hasPrevPage: false,
    limit: 10,
    nextPage: null,
    page: 1,
    pagingCounter: 1,
    prevPage: null,
    totalDocs: docs.length,
    totalPages: 1,
  }
}
