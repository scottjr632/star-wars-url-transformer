FROM golang as builder

WORKDIR /app
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build

FROM scratch

COPY --from=builder /app/interesting-url-transformer /

CMD [ "/interesting-url-transformer" ]