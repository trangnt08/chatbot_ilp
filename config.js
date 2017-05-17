'use strict';

const WIT_TOKEN = process.env.WIT_TOKEN || 'OSJSQJ2VTJCKAQTC3DV3E7BLUGTWSMKS'
if (!WIT_TOKEN) {
  throw new Error('Missing WIT_TOKEN. Go to https://wit.ai/docs/quickstart to get one.')
}


var FB_PAGE_TOKEN = process.env.FB_PAGE_TOKEN || 'EAAWVN5KkaeUBANWHg71us0173gZA0Xp4VHO7pTsdHl6XJeZAZBsozzFmE8KdLcZCOT1ZCkZCkVrAfF1CMlNoJZAerNKVGi2Qd1JPjzRgBZBsa0NLs5dLD2nLttSHW3GzuteZC0Ah1gFDRscZCf9w2aNNZA9qzL4aE8puIlbDkQ7oVVBVAZDZD';
if (!FB_PAGE_TOKEN) {
	throw new Error('Missing FB_PAGE_TOKEN. Go to https://developers.facebook.com/docs/pages/access-tokens to get one.')
}

var FB_VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN || 'welcome_to_fb_nguyen_thuy_trang'

module.exports = {
  WIT_TOKEN: WIT_TOKEN,
  FB_PAGE_TOKEN: FB_PAGE_TOKEN,
  FB_VERIFY_TOKEN: FB_VERIFY_TOKEN,
}
