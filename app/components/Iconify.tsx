"use client";

import { Icon as BaseIcon, IconProps } from "@iconify/react";
import React from "react";

const Iconify: React.FunctionComponent<IconProps & { className?: string }> = ({
  className,
  ...props
}) => {
  return <BaseIcon {...props} className={`text-current shrink-0 ${className}`} />;
};

export default Iconify;
