import { createClient } from 'microcms-js-sdk';
import type {
    MicroCMSQueries,
    MicroCMSImage,
    MicroCMSListContent,
} from 'microcms-js-sdk';

export type Member = {
    name: string;
    position: string;
    profile: string;
    image: MicroCMSImage;
} & MicroCMSListContent;

export type Category = {
    name: string;
} & MicroCMSListContent;

export type News = {
    title: string;
    description: string;
    content: string;
    thumbnail: MicroCMSImage;
    category: Category;
} & MicroCMSListContent;

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
    throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

if (!process.env.MICROCMS_API_KEY) {
    throw new Error("MICROCMS_API_KEY is required");
}

const client = createClient({
    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
    apiKey: process.env.MICROCMS_API_KEY,
});

type NewsListResponse = {
    contents: News[];
};

export const getMembersList = async (queries?: MicroCMSQueries) => {
    const listData = await client
        .get<Member>({
            endpoint: 'members',
            queries,
        });
    return listData;
}

export const getNewsList = async (queries?: MicroCMSQueries): Promise<NewsListResponse> => {
    const listData = await client
        .get<NewsListResponse>({
            endpoint: 'news',
            queries,
        });
    return listData;
};

export const getNewsDetail = async (
    contentId: string,
    queries?: MicroCMSQueries,
): Promise<News> => {
    const detailData = await client.get<News>({
        endpoint: "news",
        contentId,
        queries,
    });
    return detailData;
};

export const getCategoryDetail = async (
    contentId: string,
    queries?: MicroCMSQueries,
) => {
    const detailData = await client.get<Category>({
        endpoint: "categories",
        contentId,
        queries,
    });
    return detailData;
};