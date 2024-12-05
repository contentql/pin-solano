/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  collections: {
    pages: Page;
    blogs: Blog;
    tags: Tag;
    media: Media;
    users: User;
    forms: Form;
    'form-submissions': FormSubmission;
    search: Search;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  db: {
    defaultIDType: number;
  };
  globals: {
    'site-settings': SiteSetting;
  };
  locale: null;
  user: User & {
    collection: 'users';
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages".
 */
export interface Page {
  id: number;
  title: string;
  layout?:
    | (
        | DetailsType
        | ListType
        | HomeHeroType
        | PopularBlogsTypes
        | LatestBlogsTypes
        | TopPicksTypes
        | HomeTagsType
        | BlogsHeroType
        | HeroType
        | FormType
        | DisqusCommentsType
      )[]
    | null;
  meta?: {
    title?: string | null;
    description?: string | null;
    image?: (number | null) | Media;
  };
  isHome?: boolean | null;
  isDynamic?: boolean | null;
  slugMode?: ('generate' | 'custom') | null;
  slug?: string | null;
  pathMode?: ('generate' | 'custom') | null;
  path?: string | null;
  parent?: (number | null) | Page;
  breadcrumbs?:
    | {
        doc?: (number | null) | Page;
        url?: string | null;
        label?: string | null;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "DetailsType".
 */
export interface DetailsType {
  collectionSlug?: ('blogs' | 'tags' | 'users') | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'Details';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ListType".
 */
export interface ListType {
  title?: string | null;
  collectionSlug?: ('blogs' | 'tags' | 'users') | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'List';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "HomeHeroType".
 */
export interface HomeHeroType {
  headline: string;
  subHeadline: string;
  subTitle: string;
  buttons: {
    button: string;
    link: string;
    id?: string | null;
  }[];
  tagTitle?: string | null;
  tags?:
    | {
        relationTo: 'tags';
        value: number | Tag;
      }[]
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'HomeHero';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tags".
 */
export interface Tag {
  id: number;
  tagImage: number | Media;
  title: string;
  description: string;
  color?: ('blue' | 'gray' | 'red' | 'green' | 'yellow' | 'indigo' | 'purple' | 'pink') | null;
  meta?: {
    title?: string | null;
    description?: string | null;
    image?: (number | null) | Media;
  };
  slug?: string | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: number;
  alt?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
  sizes?: {
    thumbnail?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    blogImageSize2?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    blogImageSize3?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "PopularBlogsTypes".
 */
export interface PopularBlogsTypes {
  title: string;
  subTitle: string;
  popularBlogs: {
    relationTo: 'blogs';
    value: number | Blog;
  }[];
  id?: string | null;
  blockName?: string | null;
  blockType: 'PopularBlogs';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "blogs".
 */
export interface Blog {
  id: number;
  blogImage: number | Media;
  title: string;
  description: string;
  tags?:
    | {
        relationTo: 'tags';
        value: number | Tag;
      }[]
    | null;
  author?:
    | {
        relationTo: 'users';
        value: number | User;
      }[]
    | null;
  content: {
    [k: string]: unknown;
  }[];
  meta?: {
    title?: string | null;
    description?: string | null;
    image?: (number | null) | Media;
  };
  slug?: string | null;
  selectBlogSize?: ('1' | '2') | null;
  publishOn?: string | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: number;
  displayName?: string | null;
  username: string;
  imageUrl?: (number | null) | Media;
  role: ('admin' | 'author' | 'user')[];
  emailVerified?: string | null;
  socialLinks?:
    | {
        platform:
          | 'website'
          | 'facebook'
          | 'instagram'
          | 'twitter'
          | 'linkedin'
          | 'youtube'
          | 'tiktok'
          | 'pinterest'
          | 'snapchat'
          | 'reddit'
          | 'tumblr'
          | 'whatsapp'
          | 'telegram'
          | 'github'
          | 'medium'
          | 'quora'
          | 'discord';
        value: string;
        id?: string | null;
      }[]
    | null;
  bio?: string | null;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  _verified?: boolean | null;
  _verificationToken?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "LatestBlogsTypes".
 */
export interface LatestBlogsTypes {
  title: string;
  latestBlogs: {
    relationTo: 'blogs';
    value: number | Blog;
  }[];
  id?: string | null;
  blockName?: string | null;
  blockType: 'LatestBlogs';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "TopPicksTypes".
 */
export interface TopPicksTypes {
  title: string;
  topPicks: {
    relationTo: 'blogs';
    value: number | Blog;
  }[];
  id?: string | null;
  blockName?: string | null;
  blockType: 'TopPicks';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "HomeTagsType".
 */
export interface HomeTagsType {
  title: string;
  subTitle: string;
  tags?:
    | {
        relationTo: 'tags';
        value: number | Tag;
      }[]
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'HomeTags';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "BlogsHeroType".
 */
export interface BlogsHeroType {
  title: string;
  description: string;
  button?: string | null;
  link?: string | null;
  blogs?:
    | {
        relationTo: 'blogs';
        value: number | Blog;
      }[]
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'BlogHero';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "HeroType".
 */
export interface HeroType {
  title: string;
  description: string;
  image: number | Media;
  id?: string | null;
  blockName?: string | null;
  blockType: 'Hero';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "FormType".
 */
export interface FormType {
  title: string;
  form: {
    relationTo: 'forms';
    value: number | Form;
  };
  id?: string | null;
  blockName?: string | null;
  blockType: 'FormBlock';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "forms".
 */
export interface Form {
  id: number;
  title: string;
  fields?:
    | (
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            required?: boolean | null;
            defaultValue?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'checkbox';
          }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'country';
          }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'email';
          }
        | {
            message?:
              | {
                  [k: string]: unknown;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'message';
          }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            defaultValue?: number | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'number';
          }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            defaultValue?: string | null;
            options?:
              | {
                  label: string;
                  value: string;
                  id?: string | null;
                }[]
              | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'select';
          }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            defaultValue?: string | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'text';
          }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            defaultValue?: string | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'textarea';
          }
      )[]
    | null;
  submitButtonLabel?: string | null;
  confirmationType?: ('message' | 'redirect') | null;
  confirmationMessage?:
    | {
        [k: string]: unknown;
      }[]
    | null;
  redirect?: {
    url: string;
  };
  emails?:
    | {
        emailTo?: string | null;
        cc?: string | null;
        bcc?: string | null;
        replyTo?: string | null;
        emailFrom?: string | null;
        subject: string;
        message?:
          | {
              [k: string]: unknown;
            }[]
          | null;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "DisqusCommentsType".
 */
export interface DisqusCommentsType {
  title?: string | null;
  shortName: string;
  id?: string | null;
  blockName?: string | null;
  blockType: 'DisqusComments';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "form-submissions".
 */
export interface FormSubmission {
  id: number;
  form: number | Form;
  submissionData?:
    | {
        field: string;
        value: string;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "search".
 */
export interface Search {
  id: number;
  title?: string | null;
  priority?: number | null;
  doc:
    | {
        relationTo: 'blogs';
        value: number | Blog;
      }
    | {
        relationTo: 'tags';
        value: number | Tag;
      }
    | {
        relationTo: 'users';
        value: number | User;
      };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: number;
  document?:
    | ({
        relationTo: 'pages';
        value: number | Page;
      } | null)
    | ({
        relationTo: 'blogs';
        value: number | Blog;
      } | null)
    | ({
        relationTo: 'tags';
        value: number | Tag;
      } | null)
    | ({
        relationTo: 'media';
        value: number | Media;
      } | null)
    | ({
        relationTo: 'users';
        value: number | User;
      } | null)
    | ({
        relationTo: 'forms';
        value: number | Form;
      } | null)
    | ({
        relationTo: 'form-submissions';
        value: number | FormSubmission;
      } | null)
    | ({
        relationTo: 'search';
        value: number | Search;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: number;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: number;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "site-settings".
 */
export interface SiteSetting {
  id: number;
  general: {
    title: string;
    description: string;
    faviconUrl: number | Media;
    ogImageUrl: number | Media;
    keywords?: string[] | null;
  };
  navbar: {
    logo: BrandLogo;
    menuLinks?:
      | {
          group?: boolean | null;
          menuLink?: {
            type?: ('reference' | 'custom') | null;
            newTab?: boolean | null;
            label: string;
            page?: {
              relationTo: 'pages';
              value: number | Page;
            } | null;
            url?: string | null;
            id?: string | null;
          };
          menuLinkGroup?: {
            groupTitle: string;
            groupLinks?:
              | {
                  type?: ('reference' | 'custom') | null;
                  newTab?: boolean | null;
                  label: string;
                  page?: {
                    relationTo: 'pages';
                    value: number | Page;
                  } | null;
                  url?: string | null;
                  id?: string | null;
                }[]
              | null;
          };
          id?: string | null;
        }[]
      | null;
  };
  footer: {
    logo: BrandLogo;
    footerLinks?:
      | {
          group?: boolean | null;
          menuLink?: {
            type?: ('reference' | 'custom') | null;
            newTab?: boolean | null;
            label: string;
            page?: {
              relationTo: 'pages';
              value: number | Page;
            } | null;
            url?: string | null;
            id?: string | null;
          };
          menuLinkGroup?: {
            groupTitle: string;
            groupLinks?:
              | {
                  type?: ('reference' | 'custom') | null;
                  newTab?: boolean | null;
                  label: string;
                  page?: {
                    relationTo: 'pages';
                    value: number | Page;
                  } | null;
                  url?: string | null;
                  id?: string | null;
                }[]
              | null;
          };
          id?: string | null;
        }[]
      | null;
    socialLinks?:
      | {
          platform:
            | 'website'
            | 'facebook'
            | 'instagram'
            | 'twitter'
            | 'linkedin'
            | 'youtube'
            | 'tiktok'
            | 'pinterest'
            | 'snapchat'
            | 'reddit'
            | 'tumblr'
            | 'whatsapp'
            | 'telegram'
            | 'github'
            | 'medium'
            | 'quora'
            | 'discord';
          value: string;
          id?: string | null;
        }[]
      | null;
    copyright?: string | null;
  };
  redirectionLinks?: {
    blogLink?: {
      relationTo: 'pages';
      value: number | Page;
    } | null;
    authorLink?: {
      relationTo: 'pages';
      value: number | Page;
    } | null;
    tagLink?: {
      relationTo: 'pages';
      value: number | Page;
    } | null;
  };
  monetization?: {
    adSenseId?: string | null;
    measurementId?: string | null;
  };
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "BrandLogo".
 */
export interface BrandLogo {
  imageUrl: number | Media;
  height?: number | null;
  width?: number | null;
  description?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}