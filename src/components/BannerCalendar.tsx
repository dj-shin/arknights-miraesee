import React, { useState } from "react";
import './BannerCalendar.scss';
import { Banner, banners } from "../hooks/banner";
import { createPortal } from "react-dom";

function getDays(month: number, year: number): number {
    return new Date(year, month, 0).getDate();
}

function isSunday(year: number, month: number, date: number): boolean {
    return new Date(year, month, date).getDay() === 0;
}

interface VerticalCalendarProps {
    gameEventList: GameEvent[];
    year: number;
    month: number;
    openModal(event: Element, date: Date): void;
}
const VerticalCalendar: React.FunctionComponent<VerticalCalendarProps> = (props) => {
    const days = getDays(props.month, props.year);
    const daysList = range(days)
    const onDateClick = (event: React.MouseEvent<HTMLSpanElement>, idx: number) => {
        event.stopPropagation();
        props.openModal(event.currentTarget, new Date(props.year, props.month, idx + 1));
    };
    const filteredEvents = props.gameEventList
        .filter(data => data.start.getMonth() <= props.month && props.month <= data.end.getMonth());
    return (
        <div className="vertical-calendar">
            <span className="vertical-calendar__title">{props.month + 1}月</span>
            <div className="vertical-calendar__container">
                <div className="vertical-calendar__container__column">
                    <ul>
                        {daysList.map((idx: number) => (
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
                <div
                    className="vertical-calendar__container__column"
                >
                    {filteredEvents.map(data => (
                        <div
                            key={data.name}
                            className="event-item"
                            style={{
                                top: `${(data.start.getTime() - new Date(props.year, props.month, 1).getTime()) / 1000 / 60 / 60 / 24 / days * 100}%`,
                                height: `${(data.end.getTime() - data.start.getTime()) / 1000 / 60 / 60 / 24 / days * 100}%`,
                            }}
                        >
                            <img
                                src={data.preview}
                                alt={data.name}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function range(n: number): number[] {
    return Array.from(Array(n).keys());
}

interface ModalProps {
    parent: Element | null;
    addGameEvent(data: GameEvent): void;
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

interface GameEvent {
    start: Date;
    end: Date;
    preview: string;
    name: string;
}
const BannerCalendar: React.FunctionComponent = () => {
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth());
    const [modalParent, setModalParent] = useState<Element|null>(null);
    const [selectedDate, setSelectedDate] = useState<Date|null>(null);
    const [gameEventList, setGameEventList] = useState<GameEvent[]>([]);
    const addGameEvent = (data: Banner) => setGameEventList([...gameEventList, data]);
    const MAIN_DISPLAY_RANGE = 5;
    const FADE_DISPLAY_RANGE = 2;
    const main_months = range(MAIN_DISPLAY_RANGE)
        .map((idx: number) => {
            const referenceDate = new Date(year, month + idx);
            return (<VerticalCalendar
                gameEventList={gameEventList}
                key={idx}
                year={referenceDate.getFullYear()}
                month={referenceDate.getMonth()}
                openModal={(target, date) => {
                    setModalParent(target);
                    setSelectedDate(date);
                }}
            />)
        });
    return (
        <div id="banner-calendar" onClick={() => setModalParent(null)}>
            {main_months}
            <Modal parent={modalParent} addGameEvent={(data: Banner) => {
                if (selectedDate) {
                    addGameEvent({
                        ...data,
                        start: selectedDate,
                        end: new Date(selectedDate.getTime() + data.end.getTime() - data.start.getTime()),
                    })
                }
            }}/>
        </div>
    );
}
export default BannerCalendar;
