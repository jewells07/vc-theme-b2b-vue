import { DEFAULT_PAGE_SIZE } from "@/core/constants";
import globals from "@/core/globals";
import { WishlistsSearchParams } from "@/xapi/graphql/account";
import { Query, QueryWishlistsArgs, WishlistConnection } from "@/xapi/types";
import queryDocument from "./getWishlists.graphql";

export default async function getWishlists({
  itemsPerPage = DEFAULT_PAGE_SIZE,
  page = 1,
  sort,
}: Partial<WishlistsSearchParams>): Promise<WishlistConnection> {
  const { storeId, userId, cultureName, currencyCode } = globals;
  const { $graphqlClient } = useNuxtApp();

  const { data } = await $graphqlClient.query<Required<Pick<Query, "wishlists">>, QueryWishlistsArgs>({
    query: queryDocument,
    variables: {
      storeId,
      userId,
      cultureName,
      currencyCode,
      sort,
      first: itemsPerPage,
      after: String((page - 1) * itemsPerPage),
    },
  });

  return data.wishlists;
}
