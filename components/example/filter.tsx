"use client";

import { IconArrow } from "@/components/post/toc";
import * as React from "react";
import { HTMLProps } from "react";
import cx from "@/utils/cx";
import Icon, { ICON_NAMES } from "@/components/icon";
import IconRedis from "@/components/icon-redis";
import IconKafka from "@/components/icon-kafka";
import IconQStash from "@/components/icon-qstash";

export const ProductsLabel = {
  redis: "Redis",
  kafka: "Kafka",
  qstash: "QStash",
};

export default function ExampleFilter({
  selectedProducts,
  setSelectedProduct,
  selectedUseCase,
  setSelectedUseCase,
  selectedStacks,
  setSelectedStack,
  queriedStacks,
  handleStackQuery,
  stackQuery,
  queriedUseCases,
  handleUseCaseQuery,
  useCaseQuery,
}) {
  const isFilterDirty = React.useMemo(() => {
    return (
      selectedProducts.length > 0 ||
      selectedUseCase.length > 0 ||
      selectedStacks.length > 0
    );
  }, [selectedProducts, selectedUseCase, selectedStacks]);
  return (
    <>
      <ExampleFilterMobile
        isFilterDirty={isFilterDirty}
        selectedProducts={selectedProducts}
        setSelectedProduct={setSelectedProduct}
        selectedUseCase={selectedUseCase}
        setSelectedUseCase={setSelectedUseCase}
        selectedStacks={selectedStacks}
        setSelectedStack={setSelectedStack}
        queriedStacks={queriedStacks}
        handleStackQuery={handleStackQuery}
        stackQuery={stackQuery}
        queriedUseCases={queriedUseCases}
        handleUseCaseQuery={handleUseCaseQuery}
        useCaseQuery={useCaseQuery}
      />
      <ExampleFilterDesktop
        isFilterDirty={isFilterDirty}
        selectedProducts={selectedProducts}
        setSelectedProduct={setSelectedProduct}
        selectedUseCase={selectedUseCase}
        setSelectedUseCase={setSelectedUseCase}
        selectedStacks={selectedStacks}
        setSelectedStack={setSelectedStack}
        queriedStacks={queriedStacks}
        handleStackQuery={handleStackQuery}
        stackQuery={stackQuery}
        queriedUseCases={queriedUseCases}
        handleUseCaseQuery={handleUseCaseQuery}
        useCaseQuery={useCaseQuery}
      />
    </>
  );
}

function ExampleFilterDesktop({
  isFilterDirty,
  selectedProducts,
  setSelectedProduct,
  selectedUseCase,
  setSelectedUseCase,
  selectedStacks,
  setSelectedStack,
  queriedStacks,
  handleStackQuery,
  stackQuery,
  queriedUseCases,
  handleUseCaseQuery,
  useCaseQuery,
}) {
  return (
    <form className="hidden gap-4 sm:grid">
      <Child className="sm:-mt-10">
        <div className="flex items-center ">
          <h4 className="text-sm uppercase tracking-widest opacity-60">
            Filter
          </h4>
          {isFilterDirty && (
            <button
              type="button"
              onClick={() => {
                setSelectedProduct([]);
                setSelectedUseCase([]);
                setSelectedStack([]);
                handleStackQuery({ target: { value: "" } });
                handleUseCaseQuery({ target: { value: "" } });
              }}
              className="ml-auto inline-flex h-5 items-center justify-center rounded-full bg-white/5 px-2 text-sm text-white/40"
            >
              Clear
            </button>
          )}
        </div>
      </Child>
      <FormContent
        selectedProducts={selectedProducts}
        setSelectedProduct={setSelectedProduct}
        selectedUseCase={selectedUseCase}
        setSelectedUseCase={setSelectedUseCase}
        selectedStacks={selectedStacks}
        setSelectedStack={setSelectedStack}
        queriedStacks={queriedStacks}
        handleStackQuery={handleStackQuery}
        stackQuery={stackQuery}
        queriedUseCases={queriedUseCases}
        handleUseCaseQuery={handleUseCaseQuery}
        useCaseQuery={useCaseQuery}
      />
    </form>
  );
}

function ExampleFilterMobile({
  isFilterDirty,
  selectedProducts,
  setSelectedProduct,
  selectedUseCase,
  setSelectedUseCase,
  selectedStacks,
  setSelectedStack,
  queriedStacks,
  handleStackQuery,
  stackQuery,
  queriedUseCases,
  handleUseCaseQuery,
  useCaseQuery,
}) {
  return (
    <div className="block  sm:hidden">
      <Toc>
        <Toc.Summary className="pl-3">
          <div className="flex items-center ">
            <h4 className="text-sm uppercase tracking-widest text-white/90 opacity-100">
              Filter
            </h4>
            {isFilterDirty && (
              <button
                type="button"
                onClick={() => {
                  setSelectedProduct([]);
                  setSelectedUseCase([]);
                  setSelectedStack([]);
                  handleStackQuery({ target: { value: "" } });
                  handleUseCaseQuery({ target: { value: "" } });
                }}
                className="ml-auto inline-flex h-5 items-center justify-center rounded-full bg-white/5 px-2 text-sm text-white/40"
              >
                Clear
              </button>
            )}
          </div>
        </Toc.Summary>
        <div className="px-6 pt-2">
          <FormContent
            selectedProducts={selectedProducts}
            setSelectedProduct={setSelectedProduct}
            selectedUseCase={selectedUseCase}
            setSelectedUseCase={setSelectedUseCase}
            selectedStacks={selectedStacks}
            setSelectedStack={setSelectedStack}
            queriedStacks={queriedStacks}
            handleStackQuery={handleStackQuery}
            stackQuery={stackQuery}
            queriedUseCases={queriedUseCases}
            handleUseCaseQuery={handleUseCaseQuery}
            useCaseQuery={useCaseQuery}
          />
        </div>
      </Toc>
    </div>
  );
}

function FormContent({
  selectedProducts,
  setSelectedProduct,
  selectedUseCase,
  setSelectedUseCase,
  selectedStacks,
  setSelectedStack,
  queriedStacks,
  handleStackQuery,
  stackQuery,
  queriedUseCases,
  handleUseCaseQuery,
  useCaseQuery,
}) {
  return (
    <>
      <Child>
        <div className="flex w-[100%] flex-row items-center justify-between gap-1 space-y-0.5 sm:block">
          {["redis", "kafka", "qstash"].map((key) => {
            const isRedis = key === "redis";
            const isKafka = key === "kafka";
            const isQStash = key === "qstash";
            const isActive = selectedProducts.includes(key);

            return (
              <Item
                key={key}
                value={key}
                checked={selectedProducts.includes(key)}
                label={ProductsLabel[key]}
                onChange={(e) => {
                  const { value, checked } = e.target;
                  if (checked) {
                    setSelectedProduct([...selectedProducts, value]);
                  } else {
                    setSelectedProduct(
                      selectedProducts.filter((item) => item !== value),
                    );
                  }
                }}
                className={cx(
                  isRedis && isActive && "bg-red-200/10",
                  isKafka && isActive && "bg-blue-200/10",
                  isQStash && isActive && "bg-purple-200/10",
                  " w-[100%] justify-center pl-0 sm:pl-4",
                )}
                icon={
                  <>
                    {isRedis && (
                      <IconRedis
                        width={20}
                        className={cx("grayscale", isActive && "grayscale-0")}
                      />
                    )}
                    {isKafka && (
                      <IconKafka
                        width={20}
                        className={cx("grayscale", isActive && "grayscale-0")}
                      />
                    )}
                    {isQStash && (
                      <IconQStash
                        width={20}
                        className={cx("grayscale", isActive && "grayscale-0")}
                      />
                    )}
                  </>
                }
              />
            );
          })}
        </div>
      </Child>
      <Child>
        <Toc className="mt-4 sm:mt-0">
          <Toc.Summary count={selectedStacks.length}>Stack</Toc.Summary>
          <div className=" w-[100%]">
            <div className="w-[100%] border-b border-b-white/5 py-4">
              <input
                type="search"
                className="text:white focus:border-1 border-1 w-[100%] rounded  border-white/5 bg-white/10 px-4 py-2 text-slate-100 transition ease-in-out focus:border-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                placeholder="Search for a stack..."
                value={stackQuery}
                onChange={(e) => {
                  handleStackQuery(e);
                }}
              />
            </div>

            <div className="grid h-[14rem] grid-flow-row auto-rows-[3.125rem] space-y-0.5 overflow-scroll">
              {queriedStacks.length !== 0 ? (
                queriedStacks.map((key) => {
                  return (
                    <Item
                      key={key}
                      value={key}
                      checked={selectedStacks.includes(key)}
                      label={key}
                      onChange={(e) => {
                        const { value, checked } = e.target;
                        if (checked) {
                          setSelectedStack([...selectedStacks, value]);
                        } else {
                          setSelectedStack(
                            selectedStacks.filter((item) => item !== value),
                          );
                        }
                      }}
                    />
                  );
                })
              ) : (
                <div className="grid h-[100%] w-[100%] items-center justify-center">
                  <p className="text-white/40">No stacks found</p>
                </div>
              )}
            </div>
          </div>
        </Toc>
      </Child>
      <Child>
        <Toc className="mt-4 sm:mt-0">
          <Toc.Summary count={selectedUseCase.length}>Use Cases</Toc.Summary>
          <div className="w-[100%] space-y-0.5">
            <div className="w-[100%] border-b border-b-white/5 py-4">
              <input
                type="search"
                className="text:white focus:border-1 border-1 w-[100%] rounded  border-white/5 bg-white/10 px-4 py-2 text-slate-100 transition ease-in-out focus:border-zinc-100/3 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                placeholder="Search for an use case..."
                value={useCaseQuery}
                onChange={(e) => {
                  handleUseCaseQuery(e);
                }}
              />
            </div>
            <div className="grid h-[14rem] grid-flow-row auto-rows-[3.125rem] space-y-0.5 overflow-scroll">
              {queriedUseCases.length !== 0 ? (
                queriedUseCases.map((key) => {
                  console.log("ITEM");
                  return (
                    <Item
                      key={key}
                      value={key}
                      checked={selectedUseCase.includes(key)}
                      label={key}
                      onChange={(e) => {
                        const { value, checked } = e.target;
                        if (checked) {
                          setSelectedUseCase([...selectedUseCase, value]);
                        } else {
                          setSelectedUseCase(
                            selectedUseCase.filter((item) => item !== value),
                          );
                        }
                      }}
                    />
                  );
                })
              ) : (
                <div className="grid h-[100%] w-[100%] items-center justify-center">
                  <p className="text-white/40">No use cases found</p>
                </div>
              )}
            </div>
          </div>
        </Toc>
      </Child>
    </>
  );
}

function Child({ className, children, ...props }: HTMLProps<HTMLDivElement>) {
  return (
    <div className={cx("border-b border-b-white/5 pb-4", className)} {...props}>
      {children}
    </div>
  );
}

function Toc({ className, children, ...props }: HTMLProps<HTMLDetailsElement>) {
  return (
    <details
      role="navigation"
      aria-label="Use Cases"
      className={cx("group/toc", className)}
      {...props}
    >
      {children}
    </details>
  );
}

Toc.Summary = function TocSummary({
  count = 0,
  className,
  children,
  ...props
}: HTMLProps<HTMLDetailsElement> & { count?: number }) {
  return (
    <summary
      className={cx(
        "flex select-none list-none items-center gap-2",
        "mb-px h-10 rounded px-4 text-white/40 hover:bg-white/3 ",
        className,
      )}
      {...props}
    >
      <span className="inline-flex w-5 shrink-0 items-center justify-center">
        <IconArrow className="rotate-0 group-open/toc:rotate-90" />
      </span>
      <span className="grow text-sm uppercase tracking-wide ">{children}</span>
      {count > 0 && (
        <span className="inline-flex h-5 items-center justify-center rounded-full bg-white/5 px-2 font-mono text-sm">
          {count}
        </span>
      )}
    </summary>
  );
};

function Item({
  value,
  icon,
  label,
  className,
  checked,
  onChange = () => {},
}: HTMLProps<HTMLLabelElement> & {
  icon?: React.ReactNode;
  value: string;
  label: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label
      className={cx(
        " flex cursor-pointer select-none items-center gap-2",
        "rounded-lg bg-white/3  px-4 py-3 text-zinc-400",
        "  hover:bg-white/5",
        checked && "bg-white/10 text-zinc-50",
        className,
      )}
    >
      <input
        type="checkbox"
        value={value}
        onChange={onChange}
        className="pointer-events-none opacity-0"
      />
      {icon ? (
        icon
      ) : (
        <span
          className={cx(
            "relative h-5 w-5 rounded border border-white/10",
            checked && "border-emerald-400",
          )}
        >
          <Icon
            icon={ICON_NAMES.Check}
            className={cx(
              "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
              "text-lg opacity-0 transition duration-100",
              checked && "text-emerald-400 opacity-100",
            )}
          />
        </span>
      )}
      <span className="grow">{label}</span>
    </label>
  );
}
