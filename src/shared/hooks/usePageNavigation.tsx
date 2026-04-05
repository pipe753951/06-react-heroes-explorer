import { useEffect, useMemo } from "react";
import type { SetURLSearchParams } from "react-router";

interface Props {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

const usePageNavigation = function ({ searchParams, setSearchParams }: Props) {
  const page = useMemo(() => {
    const param = searchParams.get("page");
    return param ? parseInt(param, 10) : NaN;
  }, [searchParams]);

  const limit: number = useMemo(() => {
    const param = searchParams.get("limit");
    return param ? parseInt(param, 10) : NaN;
  }, [searchParams]);

  const isPageInvalid = isNaN(page) || page < 1;
  const isLimitInvalid = isNaN(limit) || limit < 1;

  useEffect(() => {
    if (!isPageInvalid && !isLimitInvalid) return;

    setSearchParams(
      (prevParams) => {
        const newParams = new URLSearchParams(prevParams);
        if (isPageInvalid) newParams.set("page", "1");
        if (isLimitInvalid) newParams.set("limit", "6");

        return newParams;
      },
      { replace: true },
    );
  }, [isLimitInvalid, isPageInvalid, setSearchParams]);

  const setPage = (page: number) => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set("page", page.toString());
      return newParams;
    });
  };

  const setLimit = (limit: number) => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set("limit", limit.toString());
      return newParams;
    });
  };

  // If page is invalid, set it to "1" in params.
  if (isPageInvalid) {
    setPage(1);
  }

  // If limit is invalid, set it to "6" in params.
  if (isLimitInvalid) {
    setLimit(6);
  }

  return {
    page: isPageInvalid ? 1 : page,
    limit: isPageInvalid ? 6 : limit,
    setPage,
    setLimit,
  };
};

export default usePageNavigation;
