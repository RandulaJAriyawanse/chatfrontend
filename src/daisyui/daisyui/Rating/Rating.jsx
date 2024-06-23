import clsx from "clsx";
import { Children, cloneElement, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import RatingItem from "./RatingItem";

const Rating = forwardRef(
  (
    {
      children,
      size,
      half,
      hidden,
      dataTheme,
      className,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const classes = twMerge(
      "rating",
      className,
      clsx({
        "rating-lg": size === "lg",
        "rating-md": size === "md",
        "rating-sm": size === "sm",
        "rating-xs": size === "xs",
        "rating-half": half,
        "rating-hidden": hidden || value === 0,
      })
    );

    return (
      <div
        aria-label="Rating"
        {...props}
        ref={ref}
        data-theme={dataTheme}
        className={classes}
      >
        {value === 0 && (
          <RatingItem className={clsx(classes, "hidden")} checked readOnly />
        )}
        {Children.map(children, (child, index) => {
          const childComponent = child;
          return cloneElement(childComponent, {
            key: index + value,
            checked: value === index + 1,
            readOnly: onChange == null,
            onChange: () => {
              onChange?.(index + 1);
            },
          });
        })}
      </div>
    );
  }
);

Rating.displayName = "Rating";

export default Rating;
