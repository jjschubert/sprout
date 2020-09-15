// import { put, takeLatest } from 'redux-saga/effects';
// import axios from 'axios';

// function* postImageUrl(action) {
//  try {
//     // const config = {
//     //     headers: { 'Content-Type': 'application/json' },
//     //     withCredentials: true,
//     //   };
//       console.log('POSTING IMAGE URL!')
//       const response = yield axios.post('/api/image', action.payload)
//       console.log(response)
//       //need to add GET
//  } catch (error) {
//     console.log('Image URL post failed', error)
//  }
// }

// function* imageInfoSaga() {
//     yield takeLatest('POST_IMAGE_URL', postImageUrl)
// }

// export default imageInfoSaga;