import React, { useEffect, useState, useRef, useContext } from "react";
import { getOneLayout } from "../../services/layout.service";
import { TicketsContext } from "../../context/tickets.context";

const DynamicLayout = ({
  layoutId,
  scale,
  edit,
  tooltip,
  formatPrices,
  addToCart,
  selected,
  setSelected,
  validationRecords,
}) => {
  const [layoutObject, setlayoutObject] = useState({});
  const { ticketsCart } = useContext(TicketsContext);

  const blockRef = useRef(null);
  const tableRef = useRef(null);

  const findOneLayout = async () => {
    try {
      const response = await getOneLayout(layoutId);
      if (response.success) {
        // console.log("GetOneLayout - Response:", response);
        setlayoutObject(response.layout);
      }
    } catch (error) {
      console.log("GetOneLayout - Error:", error.response);
    }
  };

  useEffect(() => {
    if (layoutId) {
      findOneLayout();
    }
  }, [layoutId]);

  const formatNumber = (num) => {
    if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(2).replace(/\.00$/, "") + "M";
    } else if (num >= 1_000) {
      return (num / 1_000).toFixed(2).replace(/\.00$/, "") + "k";
    } else {
      return num.toString();
    }
  };

  const soldTables = validationRecords?.tables
    ?.filter((table) => table.sold === true)
    .map((table) => table.tableId);

  // console.log("Tables Sold:", soldTables);

  const handleSelect = (
    tixId,
    tixPrice,
    tixTables,
    tixMax,
    tixName,
    tixAmount,
    tixBlockId,
    includedTickets,
    capacityTable,
    extraTicketsPrice,
    extraTicketsQuantity
  ) => {
    setSelected({
      id: tixId,
      price: tixPrice,
      hasTables: tixTables,
      maxTickets: tixMax,
      name: tixName,
      tixToGenerate: tixAmount,
      blockId: tixBlockId,
      tixIncluded: includedTickets,
      tableCapacity: capacityTable,
      ticketsExtraPrice: extraTicketsPrice,
      ticketsExtraQuantity: extraTicketsQuantity,
    });
  };

  const findTicketsAvailable = (blockId) => {
    const blockAvailability = validationRecords.areas.find(
      (area) => area.blockId === blockId
    );

    console.log("Block Availability:", blockAvailability);

    return blockAvailability ? blockAvailability.quantity : 0;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isClickInside = event.target.closest(".click-inside");

      if (!isClickInside) {
        setSelected(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [blockRef, tableRef]);

  return (
    <div className="e-dashboard-parent">
      {edit && <h1 className="e-edit-item">Edit</h1>}
      <div
        style={{
          transform: `scale(${scale})`,
          border: "2px solid black",
          width: `${layoutObject?.width * scale}px`,
          height: `${layoutObject?.height * scale}px`,
          position: "relative",
        }}
      >
        {layoutObject?.shapes?.map((shape, index) => (
          <div
            style={{
              position: "absolute",
              width: `${shape?.width * scale}px`,
              height: `${shape?.height * scale}px`,
              backgroundColor: `${shape?.backgroundColor}`,
              left: `${shape?.x * scale}px`,
              top: `${shape?.y * scale}px`,
              display: "flex",
              justifyContent: "center",
              alignItems: `center`,
              color: `${shape?.color}`,
            }}
            key={index}
          >
            <h1
              className="dashboard-table-number-child "
              style={{
                fontSize: `${shape?.fontSize * scale}px`,
                color: `${shape?.color}`,
              }}
            >
              {shape?.name}
            </h1>
          </div>
        ))}

        {layoutObject?.blocks?.map((block, index) => (
          <div
            style={{
              position: "absolute",
              width: `${block?.width * scale}px`,
              height: `${block?.height * scale}px`,
              backgroundColor: `${block?.backgroundColor}`,
              display: "flex",
              left: `${block?.x * scale}px`,
              top: `${block?.y * scale}px`,
              justifyContent: `${block?.justifyContent}`,
              alignItems: `${block?.alignItems}`,
              color: `${block?.color}`,
              border: `${block?.borderSize}px solid ${block?.borderColor}`,
              cursor: "pointer",
              opacity: selected?.id === `${block._id}` ? "0.5" : "1",
            }}
            onClick={
              !block.tables.length
                ? () => {
                    const availableTickets = findTicketsAvailable(block._id);

                    handleSelect(
                      block._id,
                      block.bprice,
                      false,
                      availableTickets,
                      block.name,
                      1,
                      block._id,
                      0,
                      0,
                      0,
                      0
                    );
                  }
                : undefined
            }
            key={index}
            className={`dasboard-table-hover click-inside ${
              ticketsCart.some((ticket) => ticket.id === block._id)
                ? "isInCart"
                : ""
            }`}
            ref={blockRef}
          >
            <h1
              className="dashboard-table-number-child dashboard-block-name-display"
              style={{ fontSize: `${block?.fontSize * scale}px` }}
            >
              {tooltip && !block.tables.length && (
                <div
                  className={
                    selected?.id === block._id
                      ? "dashboard-tooltip-block-selected"
                      : "dashboard-tooltip-block"
                  }
                  style={{
                    backgroundColor: `${block?.backgroundColor}`,
                  }}
                >
                  <h2 className="dashboard-tooltip-size">
                    <span className="dollar-span">$</span>
                    {formatPrices ? formatNumber(block.bprice) : block.bprice}
                  </h2>
                </div>
              )}
              {!block.tables.length ? <>{block?.name}</> : ""}
            </h1>
            <div className="dashboard-table-grid">
              {block?.tables?.map((table, index) => (
                <div
                  key={index}
                  style={{
                    position: "absolute",
                    width: `${table?.width * scale}px`,
                    height: `${table?.height * scale}px`,
                    backgroundColor: `${table?.backgroundColor}`,
                    left: `${table?.x * scale}px`,
                    top: `${table?.y * scale}px`,
                    justifyContent: `${table?.justifyContent}`,
                    alignItems: `${table?.alignItems}`,
                    color: `${table?.color}`,
                    border: `${table?.borderSize}px solid ${table?.borderColor}`,
                    borderRadius: `${table?.tableType === "Square" ? 0 : 50}%`,
                    opacity: selected?.id === `${table._id}` ? "0.7" : "1",
                  }}
                  className={`dashboard-table-number-parent click-inside ${
                    soldTables?.includes(table._id) ||
                    ticketsCart.some((ticket) => ticket.id === table._id)
                      ? "isInCart"
                      : ""
                  }`}
                  ref={tableRef}
                  onClick={() =>
                    handleSelect(
                      table._id,
                      table.tprice,
                      true,
                      1,
                      `Table-${table.number}`,
                      table?.ticketsIncluded,
                      table.block,
                      table?.ticketsIncluded,
                      table?.maxCapacity,
                      table?.extraTickets,
                      0
                    )
                  }
                >
                  <h1 className="dashboard-table-number-parent">
                    {table?.number}
                  </h1>

                  {tooltip && (
                    <div
                      className={
                        soldTables?.includes(table._id) ||
                        selected?.id === table?._id
                          ? "dashboard-tooltip-selected"
                          : "dashboard-tooltip"
                      }
                      style={{
                        backgroundColor: `${table?.backgroundColor}`,
                        borderRadius: `${
                          table?.tableType === "Square" ? 0 : 50
                        }%`,
                      }}
                    >
                      {!soldTables?.includes(table._id) && (
                        <h2 className="dashboard-tooltip-size">
                          <span className="dollar-span">$</span>
                          {formatPrices
                            ? formatNumber(table.tprice)
                            : table.tprice}
                        </h2>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicLayout;
