import type { JSX, PropsWithChildren } from "react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Props extends PropsWithChildren {
  title: string;
  icon: JSX.Element;
}

const HeroStatisticCard = function (props: Props) {
  const { children, title, icon } = props;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default HeroStatisticCard;
