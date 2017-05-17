'use strict';

const WIT_TOKEN = process.env.WIT_TOKEN || 'OSJSQJ2VTJCKAQTC3DV3E7BLUGTWSMKS'
if (!WIT_TOKEN) {
  throw new Error('Missing WIT_TOKEN. Go to https://wit.ai/docs/quickstart to get one.')
}


var FB_PAGE_TOKEN = process.env.FB_PAGE_TOKEN || 'EAAEIatxxxLUBAC1bCUEm9BlPRveDbEGkvol8jaYoWZAZBripXCHSjNJyEc0DoI5dktda0ym2VZAW5qOIJQM5cIRBUGcraRo3LtTf5q5HEXoIbgG6FxtRYO0hf9D8R0tlyNZC2ah7DiaFuDiZCFfRNnVMxrFKzOGChyDgPh4DiiQZDZD';
if (!FB_PAGE_TOKEN) {
	throw new Error('Missing FB_PAGE_TOKEN. Go to https://developers.facebook.com/docs/pages/access-tokens to get one.')
}

var FB_VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN || 'welcome_to_fb_nguyen_thuy_trang'

module.exports = {
  WIT_TOKEN: WIT_TOKEN,
  FB_PAGE_TOKEN: FB_PAGE_TOKEN,
  FB_VERIFY_TOKEN: FB_VERIFY_TOKEN,
}
