<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:import href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />

    <xsl:template match="/">
        <html>
            <head>
                <title>Movies Playing This Week</title>
            </head>
            <body>
                <h1>Movies Playing This Week:</h1>
                <div class="container">
                    <xsl:apply-templates select="movies/movie[playing_date &lt;= current-date()+7]" />
                </div>
            </body>
        </html>
    </xsl:template>

    <xsl:template match="movie">
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">
                    <xsl:value-of select="title" />
                </h3>
            </div>
            <div class="panel-body">
                <p>
                    <strong>Actors:</strong>
                    <xsl:value-of select="actors" />
                </p>
                <p>
                    <strong>Genre:</strong>
                    <span class="{genre}">
                        <xsl:value-of select="genre" />
                    </span>
                </p>
                <p>
                    <strong>Date:</strong>
                    <xsl:value-of select="playing_date" />
                </p>
                <p>
                    <strong>Duration:</strong>
                    <xsl:value-of select="duration" />
                </p>
            </div>
        </div>
    </xsl:template>

    <xsl:template match="genre">
        <xsl:attribute name="class">
            <xsl:value-of select="." />
        </xsl:attribute>
    </xsl:template>

</xsl:stylesheet>