import { ConfigProvider, Table, TableProps } from "antd";
import { cn } from "../../lib/utils";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

interface KeyObject {
  name: string;
  w: number;
}

export default function Check({ data }: { data: any }) {
  const keyConfig: { [key: string]: KeyObject } = {
    _id: { name: "編號", w: 0 },
    日期: { name: "日期", w: 150 },
    收盤指數: { name: "加權指數", w: 120 },
    漲跌: { name: "漲跌", w: 120 },
    "成交量(億元)": { name: "今日成交量", w: 120 },
    比較: { name: "比較", w: 70 },
    "五日成交量平均(億元)": { name: "五日成交量平均", w: 150 },
    "外資(億元)": { name: "外資(億元)", w: 150 },
    "投信(億元)": { name: "投信(億元)", w: 150 },
    "自營(億元)": { name: "自營商(億元)", w: 150 },
    "融資(億元)": { name: "融資(億元)", w: 150 },
    "融資增減(億元)": { name: "融資增減(億元)", w: 100 },
    "融券(張張)": { name: "融券(張張)", w: 150 },
    "融券增減(張)": { name: "融券增減(張)", w: 100 },
    "外資期貨未平倉多方(口)": { name: "外資期貨未平倉多方(口)", w: 200 },
    "外資期貨未平倉空方(口)": { name: "外資期貨未平倉空方(口)", w: 200 },
    "外資期貨未平倉淨單(口)": { name: "外資期貨未平倉淨單(口)", w: 200 },
    "外資期貨未平倉增減(口)": { name: "外資期貨未平倉增減(口)", w: 200 },
    "外資選擇權買權未平倉(億)": { name: "外資選擇權買權未平倉(億)", w: 100 },
    "外資選擇權賣權未平倉(億)": { name: "外資選擇權賣權未平倉(億)", w: 100 },
    "自營商選擇權買權未平倉(億)": {
      name: "自營商選擇權買權未平倉(億)",
      w: 120,
    },
    "自營商選擇權賣權未平倉(億)": {
      name: "自營商選擇權賣權未平倉(億)",
      w: 120,
    },
    "選擇權未平倉總和(億)": { name: "選擇權未平倉總和(億)", w: 120 },
    "選擇權未平倉總和增減(億)": { name: "選擇權未平倉總和增減(億)", w: 120 },
    "選擇權未平倉總和增減累計(億)": {
      name: "選擇權未平倉總和增減累計(億)",
      w: 120,
    },
    多: { name: "多", w: 70 },
    空: { name: "空", w: 70 },
  };

  const desiredOrder = [
    "日期",
    "收盤指數",
    "漲跌",
    "成交量(億元)",
    "比較",
    "五日成交量平均(億元)",
    "外資(億元)",
    "投信(億元)",
    "自營(億元)",
    "融資(億元)",
    "融資增減(億元)",
    "融券(張張)",
    "融券增減(張)",
    "外資期貨未平倉多方(口)",
    "外資期貨未平倉空方(口)",
    "外資期貨未平倉淨單(口)",
    "外資期貨未平倉增減(口)",
    "外資選擇權買權未平倉(億)",
    "外資選擇權賣權未平倉(億)",
    "自營商選擇權買權未平倉(億)",
    "自營商選擇權賣權未平倉(億)",
    "選擇權未平倉總和(億)",
    "選擇權未平倉總和增減(億)",
    "選擇權未平倉總和增減累計(億)",
    "多",
    "空",
    // Add other keys in desired order
  ];
  // const filterKeys = ["日期"];
  const columns: TableProps<any>["columns"] = desiredOrder.map((key) => {
    return {
      title: (
        <div className={cn("text-wrap text-center")}>{keyConfig[key].name}</div>
      ),
      dataIndex: key,
      key: key,
      ellipsis: true,
      width: keyConfig[key].w,
      className: "text-base h-14 px-4",
      // sorter: filterKeys.includes(key)
      //   ? (a: any, b: any) => a[key] - b[key]
      //   : false,
      render: (text, record) => {
        const value = record[key];
        if (key === "比較") {
          return (
            <div
              className={cn(
                "flex h-full w-full items-center justify-center",
                record[key] === ">"
                  ? "text-dataR bg-dataBR"
                  : "text-dataG bg-dataBG",
              )}
            >
              {text}
            </div>
          );
        }
        if (key === "漲跌") {
          return (
            <div
              className={cn(
                "text-center",
                record[key] < 0 ? "text-dataR" : "text-dataG",
              )}
            >
              {Number(Number(text).toFixed(2))}
            </div>
          );
        }
        if (key === "外資(億元)") {
          return (
            <div
              className={cn(
                "h-full w-full items-center justify-center pt-4 text-center leading-none",
                value > 100
                  ? "text-dataR bg-dataBR"
                  : value < -100
                    ? "text-dataG bg-dataBG"
                    : value < 0
                      ? "text-dataR"
                      : "text-dataG",
              )}
            >
              {value ? value.toFixed(3) : "-"}
            </div>
          );
        }
        if (key === "投信(億元)" || key === "自營(億元)") {
          return (
            <div
              className={cn(
                "flex h-full w-full items-center justify-center",
                value < 0 ? "text-dataR" : "",
              )}
            >
              {value ? value.toFixed(3) : "-"}
            </div>
          );
        }
        if (
          key === "融券增減(張)" ||
          key === "外資期貨未平倉淨單(口)" ||
          key === "自營商選擇權買權未平倉(億)" ||
          key === "自營商選擇權賣權未平倉(億)"
        ) {
          return (
            <div
              className={cn(
                "flex h-full w-full items-center justify-center",
                value < 0 ? "text-dataR" : "",
              )}
            >
              {value ? value.toFixed(1) : "-"}
            </div>
          );
        }
        if (
          key === "外資期貨未平倉增減(口)" ||
          key === "外資選擇權買權未平倉(億)" ||
          key === "外資選擇權賣權未平倉(億)"
        ) {
          return (
            <div
              className={cn(
                "flex h-full w-full items-center justify-center",
                value > 3000
                  ? "text-dataR bg-dataBR"
                  : value < -3000
                    ? "text-dataG bg-dataBG"
                    : value < 0
                      ? "text-dataR"
                      : "text-dataG",
              )}
            >
              {value ? value.toFixed(1) : "-"}
            </div>
          );
        }
        if (key === "選擇權未平倉總和(億)") {
          return (
            <div
              className={cn(
                "flex h-full w-full items-center justify-center",
                value >= data.top10Percent
                  ? "text-dataR bg-dataBR"
                  : value <= data.bottom10Percent
                    ? "text-dataG bg-dataBG"
                    : value < 0
                      ? "text-dataR"
                      : "text-dataG",
              )}
            >
              {value ? value.toFixed(3) : "-"}
            </div>
          );
        }
        if (key === "選擇權未平倉總和增減(億)") {
          return (
            <div
              className={cn(
                "flex h-full w-full items-center justify-center",
                value >= data.top10Percent_opsum
                  ? "text-dataR bg-dataBR"
                  : value <= data.bottom10Percent_opsum
                    ? "text-dataG bg-dataBG"
                    : value < 0
                      ? "text-dataR"
                      : "text-dataG",
              )}
            >
              {value ? value.toFixed(3) : "-"}
            </div>
          );
        }
        if (key === "選擇權未平倉總和增減累計(億)") {
          return (
            <div
              className={cn(
                "flex h-full w-full items-center justify-center",
                -1 <= value && value <= 1 ? "yellow-background" : "text-dataR",
              )}
            >
              {value ? value.toFixed(3) : "-"}
            </div>
          );
        }
        if (key === "多" || key === "空") {
          return (
            <div
              className={cn(
                "flex h-full w-full items-center justify-center",
                value > 2 && "text-dataR bg-dataBR",
              )}
            >
              {text}
            </div>
          );
        }
        return text ? (
          <div className="text-center">
            {key === "日期" ? text : Number(Number(text).toFixed(2))}
          </div>
        ) : (
          "-"
        );
      },
    };
  });

  return (
    <div className="flex w-full flex-col items-center gap-10 pt-4">
      <ConfigProvider
        theme={{
          components: {
            Table: {
              cellPaddingInline: 0,
              cellPaddingBlock: 0,
            },
          },
        }}
      >
        <Table
          pagination={false}
          sticky
          scroll={{ x: 1500, y: "calc(100vh - 300px)" }}
          columns={columns}
          dataSource={data.data.map((item: any) => ({
            ...item,
            key: item._id,
          }))}
        />
      </ConfigProvider>

      <div className="flex w-full flex-col gap-2">
        <span className="text-2xl">台指夜盤期貨變動</span>
        <div
          className={cn(
            "mx-auto flex h-20 w-full items-center justify-center border border-white",
            data.data[0]["多"] > 0
              ? "bg-dataBR text-dataR"
              : "bg-dataBG text-dataG",
          )}
        >
          多空淨單 :
        </div>
      </div>
      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="flex w-full flex-col items-center gap-2">
          <span className="text-2xl">外資買賣超</span>
          <div
            className="flex aspect-square w-full items-center justify-center bg-contain bg-top bg-no-repeat"
            style={{
              // backgroundImage: `url(${data.plot1 ? data.plot1.url : "./sample.png"})`,
              backgroundImage: `url(./sample.png)`,
            }}
          >
            {/* <img
              src={data.plot1 ? data.plot1.url : "./sample.png"}
              alt=""
              className="h-full w-full"
            /> */}
          </div>
        </div>
        <div className="flex w-full flex-col items-center gap-2">
          <span className="text-2xl">融資融券變化</span>
          <div
            className="flex aspect-square w-full items-center justify-center bg-contain bg-top bg-no-repeat"
            style={{
              // backgroundImage: `url(${data.plot1 ? data.plot2.url : "./sample.png"})`,
              backgroundImage: `url(./sample.png)`,
            }}
          >
            {/* <img
              src={data.plot1 ? data.plot1.url : "./sample.png"}
              alt=""
              className="h-full w-full"
            /> */}
          </div>
        </div>
      </div>
      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="flex w-full flex-col items-center gap-2">
          <span className="text-2xl">外資期貨部份</span>
          <div
            className="flex aspect-square w-full items-center justify-center bg-contain bg-top bg-no-repeat"
            style={{
              // backgroundImage: `url(${data.plot3 ? data.plot3.url : "./sample.png"})`,
              backgroundImage: `url(./sample.png)`,
            }}
          >
            {/* <img
              src={data.plot1 ? data.plot1.url : "./sample.png"}
              alt=""
              className="h-full w-full"
            /> */}
          </div>
        </div>
        <div className="flex w-full flex-col items-center gap-2">
          <span className="text-2xl">外資選擇選</span>
          <div
            className="flex aspect-square w-full items-center justify-center bg-contain bg-top bg-no-repeat"
            style={{
              // backgroundImage: `url(${data.plot4 ? data.plot4.url : "./sample.png"})`,
              backgroundImage: `url(./sample.png)`,
            }}
          >
            {/* <img
              src={data.plot4 ? data.plot4.url : "./sample.png"}
              alt=""
              className="h-full w-full"
            /> */}
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-center gap-2">
        <span className="text-2xl">播放音訊</span>
        <AudioPlayer
          autoPlay
          volume={0.5}
          src="./speech.mp3"
          onPlay={() => console.log("onPlay")}
          // other props here
        />
      </div>
      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="flex w-full flex-col items-center gap-2">
          <span className="text-2xl">多指標</span>
          <div
            className="flex aspect-square w-full items-center justify-center bg-contain bg-top bg-no-repeat"
            style={{
              // backgroundImage: `url(${data.gauge_long ? data.gauge_long.url : "./sample.png"})`,
              backgroundImage: `url(./sample.png)`,
            }}
          >
            {/* <img
              src={data.plot1 ? data.gauge_long.url : "./sample.png"}
              alt=""
              className="h-full w-full"
            /> */}
          </div>
        </div>
        <div className="flex w-full flex-col items-center gap-2">
          <span className="text-2xl">空指標</span>
          <div
            className="flex aspect-square w-full items-center justify-center bg-contain bg-top bg-no-repeat"
            style={{
              // backgroundImage: `url(${data.gauge_short ? data.gauge_short.url : "./sample.png"})`,
              backgroundImage: `url(./sample.png)`,
            }}
          >
            {/* <img
              src={data.gauge_short ? data.gauge_short.url : "./sample.png"}
              alt=""
              className="h-full w-full"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
