"use client";

import * as React from "react";
import { HTMLProps } from "react";

import cx from "@/utils/cx";

import Icon, { ICON_NAMES } from "@/components/icon";
import IconKafka from "@/components/icon-kafka";
import IconQStash from "@/components/icon-qstash";
import IconRedis from "@/components/icon-redis";
import { IconArrow } from "@/components/post/toc";

export const ProductsLabel = {
  redis: "Redis",
  kafka: "Kafka",
  qstash: "QStash",
};

const LanguagesLabel = {
  ts: "TypeScript",
  js: "JavaScript",
  py: "Python",
  rs: "Rust",
  rb: "Ruby",
  java: "Java",
};

export default function ExampleFilter({
  selectedProducts,
  setSelectedProduct,
  selectedUseCase,
  setSelectedUseCase,
  selectedStacks,
  setSelectedStack,
  selectedLanguages,
  setSelectedLanguages,
  selectedPlatforms,
  setSelectedPlatforms,
  queriedStacks,
  queriedUseCases,
  queriedLanguages,
  queriedPlatforms,
}) {
  const isFilterDirty = React.useMemo(() => {
    return (
      selectedProducts.length > 0 ||
      selectedUseCase.length > 0 ||
      selectedStacks.length > 0 ||
      selectedLanguages.length > 0 ||
      selectedPlatforms.length > 0
    );
  }, [
    selectedProducts,
    selectedUseCase,
    selectedStacks,
    selectedLanguages,
    selectedPlatforms,
  ]);
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
        selectedLanguages={selectedLanguages}
        setSelectedLanguages={setSelectedLanguages}
        selectedPlatforms={selectedPlatforms}
        setSelectedPlatforms={setSelectedPlatforms}
        queriedStacks={queriedStacks}
        queriedUseCases={queriedUseCases}
        queriedLanguages={queriedLanguages}
        queriedPlatforms={queriedPlatforms}
      />
      <ExampleFilterDesktop
        isFilterDirty={isFilterDirty}
        selectedProducts={selectedProducts}
        setSelectedProduct={setSelectedProduct}
        selectedUseCase={selectedUseCase}
        setSelectedUseCase={setSelectedUseCase}
        selectedStacks={selectedStacks}
        setSelectedStack={setSelectedStack}
        selectedLanguages={selectedLanguages}
        setSelectedLanguages={setSelectedLanguages}
        selectedPlatforms={selectedPlatforms}
        setSelectedPlatforms={setSelectedPlatforms}
        queriedStacks={queriedStacks}
        queriedUseCases={queriedUseCases}
        queriedLanguages={queriedLanguages}
        queriedPlatforms={queriedPlatforms}
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
  selectedLanguages,
  setSelectedLanguages,
  selectedPlatforms,
  setSelectedPlatforms,
  queriedStacks,
  queriedUseCases,
  queriedLanguages,
  queriedPlatforms,
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
                setSelectedLanguages([]);
                setSelectedPlatforms([]);
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
        selectedLanguages={selectedLanguages}
        setSelectedLanguages={setSelectedLanguages}
        selectedPlatforms={selectedPlatforms}
        setSelectedPlatforms={setSelectedPlatforms}
        queriedStacks={queriedStacks}
        queriedUseCases={queriedUseCases}
        queriedLanguages={queriedLanguages}
        queriedPlatforms={queriedPlatforms}
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
  selectedLanguages,
  setSelectedLanguages,
  selectedPlatforms,
  setSelectedPlatforms,
  queriedStacks,
  queriedUseCases,
  queriedLanguages,
  queriedPlatforms,
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
            selectedLanguages={selectedLanguages}
            setSelectedLanguages={setSelectedLanguages}
            selectedPlatforms={selectedPlatforms}
            setSelectedPlatforms={setSelectedPlatforms}
            queriedStacks={queriedStacks}
            queriedUseCases={queriedUseCases}
            queriedLanguages={queriedLanguages}
            queriedPlatforms={queriedPlatforms}
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
  selectedLanguages,
  setSelectedLanguages,
  selectedPlatforms,
  setSelectedPlatforms,
  queriedStacks,
  queriedUseCases,
  queriedLanguages,
  queriedPlatforms,
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
            <div className="grid grid-flow-row auto-rows-[3.125rem] space-y-0.5">
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
        <Toc>
          <Toc.Summary count={selectedUseCase.length}>Use Cases</Toc.Summary>
          <div className="w-[100%] space-y-0.5">
            <div className="grid  grid-flow-row auto-rows-[3.125rem] space-y-0.5">
              {queriedUseCases.length !== 0 ? (
                queriedUseCases.map((key) => {
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
      <Child>
        <Toc className="mt-4 sm:mt-0">
          <Toc.Summary count={selectedLanguages.length}>Language</Toc.Summary>
          <div className=" w-[100%]">
            <div className="grid grid-flow-row auto-rows-[3.125rem] space-y-0.5">
              {queriedLanguages.length !== 0 ? (
                queriedLanguages.map((key) => {
                  return (
                    <Item
                      key={key}
                      value={key}
                      checked={selectedLanguages.includes(key)}
                      label={LanguagesLabel[key]}
                      onChange={(e) => {
                        const { value, checked } = e.target;
                        if (checked) {
                          setSelectedLanguages([...selectedLanguages, value]);
                        } else {
                          setSelectedLanguages(
                            selectedLanguages.filter((item) => item !== value),
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
          <Toc.Summary count={selectedPlatforms.length}>Platforms</Toc.Summary>
          <div className=" w-[100%]">
            <div className="grid grid-flow-row auto-rows-[3.125rem] space-y-0.5">
              {queriedPlatforms.length !== 0 ? (
                queriedPlatforms.map((key) => {
                  return (
                    <Item
                      key={key}
                      value={key}
                      checked={selectedPlatforms.includes(key)}
                      label={key}
                      onChange={(e) => {
                        const { value, checked } = e.target;
                        if (checked) {
                          setSelectedPlatforms([...selectedPlatforms, value]);
                        } else {
                          setSelectedPlatforms(
                            selectedPlatforms.filter((item) => item !== value),
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
      open={true}
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
        "mb-px h-10 rounded px-4 text-white/40 hover:bg-white/3  ",
        className,
      )}
      {...props}
    >
      <span className="inline-flex w-5 shrink-0 items-center justify-center">
        <IconArrow className="rotate-0 group-open/toc:rotate-90" />
      </span>
      <span className="grow text-sm uppercase tracking-wide">{children}</span>
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
