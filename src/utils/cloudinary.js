/**
 * Cloudinary image URL helper.
 * Set VITE_CLOUDINARY_CLOUD_NAME in .env. Optional: VITE_CLOUDINARY_FOLDER (e.g. "portfolio") if images are in a folder.
 * Public ID = folder/path (e.g. "rhive/rhive1" or "portfolio/rhive/rhive1") — no file extension.
 */

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || ''
const FOLDER = (import.meta.env.VITE_CLOUDINARY_FOLDER || '').replace(/\/$/, '') // optional prefix, no trailing slash

/**
 * Convert local path to Cloudinary public ID (no leading slash, no extension).
 * e.g. "/rhive/rhive1.png" -> "rhive/rhive1" or "portfolio/rhive/rhive1" if FOLDER set
 */
function pathToPublicId(path) {
  if (!path || typeof path !== 'string') return ''
  const clean = path.replace(/^\//, '').replace(/\.[^.]+$/, '')
  if (!clean) return ''
  return FOLDER ? `${FOLDER}/${clean}` : clean
}

/**
 * Build Cloudinary image URL with optional transformations.
 * @param {string} path - Local path e.g. "/rhive/rhive1.png", publicId "portfolio/rhive/rhive1", or full Cloudinary URL (returned as-is)
 * @param {object} options - Optional: width, height, crop, quality, fetchFormat
 * @returns {string} Full image URL (Cloudinary if env set, otherwise path for local)
 */
export function getImageUrl(path, options = {}) {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  if (!CLOUD_NAME) return path.startsWith('/') ? path : `/${path}`

  const publicId = path.startsWith('portfolio/') ? path : pathToPublicId(path)
  if (!publicId) return path.startsWith('/') ? path : `/${path}`

  const { width, height, crop, quality = 'auto', fetchFormat = 'auto' } = options
  const parts = []
  if (width) parts.push(`w_${width}`)
  if (height) parts.push(`h_${height}`)
  if (crop) parts.push(`c_${crop}`)
  if (quality) parts.push(`q_${quality}`)
  if (fetchFormat) parts.push(`f_${fetchFormat}`)
  const transforms = parts.length ? parts.join(',') + '/' : ''

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}${publicId}`
}

/**
 * Check if Cloudinary is configured.
 */
export function isCloudinaryEnabled() {
  return Boolean(CLOUD_NAME)
}

/** Full resume PDF URL (optional). If set, use as-is — use this for Cloudinary collection/delivery link (different from image URLs). */
const RESUME_URL = import.meta.env.VITE_RESUME_URL || ''
/** Resume PDF public ID (optional). Only used when VITE_RESUME_URL is not set. */
const RESUME_PUBLIC_ID = import.meta.env.VITE_RESUME_PUBLIC_ID || '30fcb940280b5e26d1acdea6e4b42a2e'

/**
 * URL for the resume PDF. Uses VITE_RESUME_URL if set (paste full delivery URL from Cloudinary); else builds raw/upload URL from public ID.
 */
export function getResumeUrl() {
  if (RESUME_URL && (RESUME_URL.startsWith('http://') || RESUME_URL.startsWith('https://'))) return RESUME_URL
  if (!CLOUD_NAME) return '/resume.pdf'
  return `https://res.cloudinary.com/${CLOUD_NAME}/raw/upload/${RESUME_PUBLIC_ID}`
}
