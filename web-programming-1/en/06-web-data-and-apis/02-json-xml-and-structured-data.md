# JSON, XML and structured data exchange

The data exchange format is not a simple packaging. It defines how we separate the data from its display, how the receiving program can clearly interpret the fields, and how they can remain interoperable with different technologies.

## The problem of unstructured text

If a server replies: ``The name of the lender: Anna Kovács, the deadline: September 12, 2026,'' it is understandable for a human, but uncertain for a program. What happens if there is a comma in the name? How do you recognize the date in other language environments? Where does a new field go? Structured data, on the other hand, marks the information with a separate name and value.

```json
{
  "borrower": { "name": "Anna Kovács" },
  "dueDate": "2026-09-12"
}
```

Here, it is not necessary to conclude from the order of the text: the receiver knows that the `dueDate` field is a date. The interface can be displayed in Hungarian, English or accessible form, while the common data remains unchanged.

## JSON: the ordinary data language of the web

JSON stands for JavaScript Object Notation. Historically, it is linked to the JavaScript object markup, but it is a language-independent data exchange format: almost all modern languages ​​can process it. JSON is text, but it has a strict grammar. It's not "JavaScript code", so things like comments and function calls can't be included.

It has two basic complex structures. The object is a set of name-value pairs between braces; the array is a sequence of values ​​arranged between square brackets. The value can be text, number, boolean (`true` or `false`), `null`, object, or array.

```json
{
  "id": 42,
  "title": "Teacher please",
  "available": true,
  "tags": ["novel", "Hungarian"],
  "publisher": null
}
```

Both keys and text values are enclosed in double quotes. The single quotation mark, the closing comma, and the `True' and `False' Python-like writing are incorrect here. JSON is strict in these details because machine interpretation must be unambiguous.

One of the limitations of JSON is that it does not have a separate date or decimal type: the text `"2026-09-12"` is interpreted by the contract. Likewise, `1` and `1.0` can become numbers, but the accuracy of large integers can be problematic depending on the language. The practical conclusion is that the API documentation should record not only the name of the field, but also its meaning and type.

## XML: tagged, tree-shaped data

XML (eXtensible Markup Language) is also structured text, but uses tags and nested elements. A similar book data might look like this:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<book id="42">
  <title>Teacher, please</title>
  <available>true</available>
  <tags>
    <tag>novel</tag>
    <member>Hungarian</member>
  </tags>
</book>
```

XML is particularly good at expressing document-like, hierarchical data. It supports namespaces, attributes, schemas, and a mature toolbox that is still important in many enterprise, document management, and industrial systems today. Because of its larger size and more complex processing, most new simple web APIs prefer JSON, but that doesn't mean XML is "outdated" or wrong.

For XML, watch out for external entity attacks (XXE) if the processor is set insecurely. This also shows that in addition to format selection, safe processing is also a planning issue.

## Worked example: interface from timetable data

A timetable API can return:

```json
{
  "semester": "1/27/2026",
  "courses": [
    {"code":"WEBPROG1","name":"Web Programming I","room":"A-101","startsAt":"2026-09-14T10:00:00+02:00"}
  ]
}
```The client first checks that the `Content-Type` header of the response is indeed `application/json`. Then it processes the text into a data structure, and finally you can create interface elements from the individual fields. `startsAt' is an ISO 8601-style timestamp: it does not tell the user how to write it, but carries a standard, machine-processable meaning. From the Hungarian interface, it can be "September 14, 2026, 10:00 a.m.", and from English it can be a different form, without modifying the API.

If the server adds a new `lecturer` field, the older client will ideally ignore it; however, if the `name` field disappears or is renamed, the client will easily break. Therefore, compatible change and versioning are an important part of data exchange.

## Schema, validity and meaning

Well-formed JSON is not necessarily business-correct. This is, for example, grammatically valid:

```json
{"room": 101, "startsAt": "and sometime"}
```

But it may be that according to the API, the room text and the time must be in ISO format. A schema is a description that specifies expected fields, types, ranges, and structure. In the case of JSON, JSON Schema can be used for this; For XML, among others, XSD. A schema is not a substitute for business rules, but it will find many misunderstandings early on.

## Format selection

The advantage of JSON is its compactness, web naturalness and simple device support. XML's strength is its rich document structure, namespaces, and long-established validation. CSV may be suitable for exporting flat tables, but it is not good for nested structures and texts containing commas also require caution. Binary formats may be smaller or faster, but less readable when debugging.

It's not just the size that matters. The legacy of the affected systems, the possibility of debugging, the schema requirement, the complexity of the data and the fact that the processing of the format is secure are all important.

## Common misconceptions

**"The JSON object."** JSON text; a program only receives the object of its own language from it after processing.

**"JSON is always easy to read."** Small examples are, but a large or poorly modeled response is hard to follow. Structuredness is not the same as clarity.

**"`null` is the same as missing field."** Not necessarily. ``null'' in many contracts means: the field is known, but currently has no value; a missing field may mean an unknown, inapplicable or legacy client response.

## Review questions

1. Why is structured data more reliable than a human sentence in communication between programs?
2. List the value types of JSON.
3. What JSON syntax errors do you find in `{name: 'Anna',}`?
4. For what data can it be justified to choose XML?
5. What does a scheme protect and what cannot it decide for us?

## Glossary

**Structured data:** data consisting of pre-interpretable fields and relationships.  
**JSON:** lightweight, textual, language-independent data exchange format.  
**XML:** tag-based, hierarchical markup language for data exchange and documents.  
**Schema:** a formal description of the data structure and validity conditions.  
**Serialization:** conversion of program data into a transferable format.  
**Deserialization:** processing of received format into program data.
