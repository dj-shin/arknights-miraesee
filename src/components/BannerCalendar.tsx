import React, {ReactDOM, useState} from "react";
import './BannerCalendar.scss';
import {banners} from "../hooks/banner";
import {createPortal} from "react-dom";

function getDays(month: number, year: number): number {
    return new Date(year, month, 0).getDate();
}

function isSunday(year: number, month: number, date: number): boolean {
    return new Date(year, month, date).getDay() === 0;
}

interface VerticalCalendarProps {
    year: number;
    month: number;
    openModal(event: Element, date: Date): void;
}
const VerticalCalendar: React.FunctionComponent<VerticalCalendarProps> = (props) => {
    const days = range(getDays(props.month, props.year));
    const onDateClick = (event: React.MouseEvent<HTMLSpanElement>, idx: number) => {
        event.stopPropagation();
        props.openModal(event.currentTarget, new Date(props.year, props.month, idx + 1));
    };
    return (
        <div className="vertical-calendar">
            <span className="vertical-calendar__title">{props.month + 1}月</span>
            <ul>
                {days.map((idx: number) => (
                    <li key={idx}>
                        <span
                            className={isSunday(props.year, props.month, idx + 1) ? "red" : ""}
                            onClick={event => onDateClick(event, idx)}
                        >
                            {idx + 1}
                        </span>
                    </li>))}
            </ul>
        </div>
    )
}

function range(n: number): number[] {
    return Array.from(Array(n).keys());
}

interface ModalProps {
    parent: Element | null;
    addGameEvent(data: any): void;
}
const Modal: React.FunctionComponent<ModalProps> = (props) => {
    return props.parent ? createPortal(
        <div className="modal" >
            {banners.map((data, idx) => (
                <img
                    style={{ top: idx * 10, left: idx * 10 }}
                    key={data.name}
                    src={data.image}
                    alt={data.name}
                    onClick={() => props.addGameEvent(data)}
                />)).reverse()
            }
        </div>
    , props.parent) : null;
}

const BannerCalendar: React.FunctionComponent = () => {
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth());
    const [modalParent, setModalParent] = useState<Element|null>(null);
    const [selectedDate, setSelectedDate] = useState<Date|null>(null);
    const MAIN_DISPLAY_RANGE = 5;
    const FADE_DISPLAY_RANGE = 2;
    const main_months = range(MAIN_DISPLAY_RANGE)
        .map((idx: number) => (
            <VerticalCalendar
                key={idx}
                year={year}
                month={month + idx}
                openModal={(target, date) => {
                    setModalParent(target);
                    setSelectedDate(date);
                }}
            />
        ));
    return (
        <div id="banner-calendar" onClick={() => setModalParent(null)}>
            {main_months}
            <Modal parent={modalParent} addGameEvent={(data: any) => {
                console.log(selectedDate, data);
            }}/>
        </div>
    );
}
export default BannerCalendar;
